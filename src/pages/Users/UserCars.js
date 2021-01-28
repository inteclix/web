import React, { useEffect, useState } from "react"
import { Button, message, Transfer, Form, Skeleton } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { _postes, _messages } from "_consts";
import SearchInput from "components/SearchInput";
import { groupBy } from "lodash";

export default function () {
  const { api } = useAppStore()
  const [cars, setCars] = useState([])
  const [data, setData] = useState({
    user_id: null,
    cars_id: [],
    loadingCars: true,
    loadingUserCars: false,
    carGroupe: "vh"
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
    if (data.user_id && data.cars_id) {
      api.post("/auth/users/cars", {
        user_id: data.user_id,
        cars_id: data.cars_id
      }).then((res) => {
        message.info("Bien ajouter")
      })
    }
  }

  useEffect(() => {
    if (data.user_id) {
      setData({ ...data, loadingUserCars: true })
      api.get("auth/users/cars/" + data.user_id).then((res) => {
        const cars_id = res.data.data.map(c => c.id)
        setData({ ...data, cars_id, loadingUserCars: false })
      })
    }
  }, [data.user_id])

  useEffect(() => {
    api.get("allcars").then((res) => {
      const _cars = res.data.data.map(car => ({ ...car, id: Number.parseInt(car.id) }))
      setData({ ...data, loadingCars: false })
      setCars(_cars)
    })
  }, [data.carGroupe])



  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setData({ ...data, cars_id: nextTargetKeys })
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKey([...sourceSelectedKeys, ...targetSelectedKeys])
  };


  return (
    <Page title="Affecté des vehicules au utilisateur" selectedSiderKey="user-cars-users">
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
            placeholder="Rechercher ..."
          />
        </Form.Item>

        {
          (data.loadingCars || data.loadingUserCars) &&
          <Skeleton />
        }

        {!(data.loadingCars || data.loadingUserCars) && data.user_id &&
          < Form.Item label={"Véhicules affecté"} name={"carsId"}>
            <Transfer
              rowKey={record => record.id}
              showSearch={true}
              dataSource={cars}
              titles={['Tout', 'Affecté']}
              targetKeys={data.cars_id}
              selectedKeys={selectedKeys}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              render={item => item.code_gps + " | " + item.matricule}
              style={{ marginBottom: 16 }}
              listStyle={{
                width: 250,
                height: 300,
              }}
              disabled={false}
            />
          </Form.Item>
        }


        <Form.Item {...formTailLayout} >
          <Button type="primary" onClick={affecte}>
            Envoyer
          </Button>
        </Form.Item>
      </Form>

    </Page >
  )
}