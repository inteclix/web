import React, { useEffect, useState } from "react"
import { Button, message, Transfer, Form, Skeleton } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { _postes, _messages } from "_consts";
import SearchInput from "components/SearchInput";
import { groupBy } from "lodash";

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    matricule: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}
export default function () {
  const { api } = useAppStore()
  window.api = api
  const [roles, setRoles] = useState([])
  const [data, setData] = useState({
    user_id: null,
    roles_id: [],
    loadingRoles: true,
    loadingUserRoles: false,
  })
  const [selectedKeys, setSelectedKey] = useState([])
  window.data = data
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };
  const formTailLayout = {
  };

  const affecte = () => {
    if (data.user_id && data.roles_id) {
      api.post("/auth/users/roles", {
        user_id: data.user_id,
        roles_id: data.roles_id
      }).then((res) => {
        message.info("Bien ajouter")
      })
    }
  }

  useEffect(() => {
    api.get("roles").then(({ data }) => {
      const _roles = data.data.map(role => ({ ...role, key: role.id }))
      setData({ ...data, loadingRoles: false })
      setRoles(_roles)
    })
  }, [])

  useEffect(() => {
    if (data.user_id) {
      setData({ ...data, loadingUserRoles: true })
      api.get("auth/users/" + data.user_id + "/roles/").then((res) => {
        const roles_id = res.data.data.map(c => c.id)
        setData({ ...data, roles_id, loadingUserRoles: false })
      })
    }
  }, [data.user_id])

  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setData({ ...data, roles_id: nextTargetKeys })
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKey([...sourceSelectedKeys, ...targetSelectedKeys])
  };


  return (
    <Page title="Affecté des vehicules au utilisateur" selectedSiderKey="user-roles-users">
      <Form
        {...formItemLayout}
        name="basic"
        layout="vertical"
        onFinish={affecte}
      >

        <Form.Item label={"Utilisateur"} name={"user_id"}>
          <SearchInput
            url="auth/users/search"
            style={{ width: 200 }}
            mapOptionToString={c => c.firstname + " " + c.lastname}
            onSelect={(value, option) => {
              setData({ ...data, user_id: option.id })
            }}
            onChange={(value, option) => {
              if (option) {
                setData({ ...data, user_id: option.id })
              } else {
                setData({ ...data, user_id: null })
              }
            }}
            placeholder="Rechercher un utilisateur ..."
          />
        </Form.Item>

        {data.user_id && (() => {
          if (data.loadingRoles || data.loadingUserRoles) {
            return <Skeleton />
          } else {
            return <Form.Item label={"Roles affecté"} name={"rolesId"}>
              <Transfer
                showSearch={true}
                dataSource={roles}
                titles={['Tout', 'Affecté']}
                targetKeys={data.roles_id}
                selectedKeys={selectedKeys}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                render={item => item.name}
                style={{ marginBottom: 16 }}
                listStyle={{
                  minWidth: 250,
                  height: 300,
                }}
                disabled={false}
              />
            </Form.Item>
          }
        })()}


        <Form.Item {...formTailLayout} >
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>

    </Page>
  )
}