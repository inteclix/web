import React, { useEffect, useState } from "react"
import { Form, Input, Button, Skeleton, message } from 'antd';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { useHistory, useRouteMatch } from "react-router-dom";
import { _postes, _prop, _marque, _carGenre, _messages, _carStateName } from "_consts";


export default function () {
  const { params } = useRouteMatch()
  const { api } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const history = useHistory()


  const edit = (postData) => {
    setLoading(true)
    postData["state_date"] = postData["state_date"] ? postData["state_date"].format("YYYY-MM-DD HH:mm:ss") : null
    api.post("/cars_state", postData).then((res) => {
      history.push("/cars_state")
      message.info("Bien ajouter")
    }).catch(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    api.get("/cars/" + params.id).then(({ data }) => {
      setData(data.data)
      setLoading(false)
    })
  }, [])

  return (
    <Page withBack={true} loading={loading} title={"Ajouter Status : " + data.matricule} selectedSiderKey="list-cars">
      <FormBuilder
        formItems={[
          {
            name: "car_id",
            label: "Véhicule",
            type: "search",
            rules: [{ required: true, message: _messages.required }],
            url: "cars/search",
            defaultOptionName: "car",
            mapOptionToString: c => c?.matricule + " | " + c?.marque,
            disabled: true
          },
          {
            name: "name",
            label: "Designation",
            type: "select",
            rules: [{ required: true, message: _messages.required }],
            selects: _carStateName
          },
          {
            name: "state_date",
            label: "Date",
            type: "date",
            rules: [{ required: true, message: _messages.required }],
          },
          {
            name: "observation",
            label: "Observation",
            type: "textarea"
          }
        ]}
        initialValues={{
          car_id: data.id,
          car: data
        }}
        onFinish={edit}
      />
    </Page>
  )
}