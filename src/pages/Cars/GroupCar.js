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
  const [cars, setCars] = useState([])
  const [data, setData] = useState({
    group_id: null,
    cars_id: [],
    loadingCars: true,
    loadingGroupCars: false,
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
  const affecte = (h) => {
    console.log(h)
    api.post("/groups/cars/" + data.group_id, data).then((res) => {
      message.info("Bien ajouter")
    })
  }

  useEffect(() => {
    if (data.group_id) {
      setData({ ...data, loadingGroupCars: true })
      api.get("groups/cars/" + data.group_id).then((res) => {
        const cars_id = res.data.data.map(c => c.id)
        setData({ ...data, cars_id, loadingGroupCars: false })
      })
    }
  }, [data.group_id])

  useEffect(() => {
    api.get("allcars").then(({ data }) => {
      const cars = data.data.map(car => ({ ...car, key: Number.parseInt(car.id) }))
      setData({ ...data, cars, loadingCars: false })
    })
  }, [data.carGroupe])



  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setData({ ...data, cars_id: nextTargetKeys })
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKey([...sourceSelectedKeys, ...targetSelectedKeys])
  };


  return (
    <Page title="Affecté des vehicules au groupe" selectedSiderKey="group-cars">
      <Form
        {...formItemLayout}
        name="basic"
        layout="vertical"
        onFinish={affecte}
      >

        <Form.Item label={"Groupe"} name={"group_id"}>
          <SearchInput
            url="groups/search"
            style={{ width: 200 }}
            mapOptionToString={c => c.name}
            onSelect={(value, option) => {
              setData({ ...data, group_id: option.id })
            }}
            onChange={(value, option) => {
              if (option) {
                setData({ ...data, group_id: option.id })
              } else {
                setData({ ...data, group_id: null })
              }
            }}
            placeholder="Rechercher ..."
          />
        </Form.Item>

        {data.group_id && (() => {
          if (data.loadingCars || data.loadingGroupCars) {
            return <Skeleton />
          } else {
            return <Form.Item label={"Véhicules affecté"} name={"carsId"}>
              <Transfer
                showSearch={true}
                dataSource={data.cars}
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