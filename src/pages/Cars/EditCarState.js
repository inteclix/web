import React, { useState, useEffect } from "react"
import { Form, Input, Button, Checkbox, message, Spin } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"

import { formItemsCarState } from "./columns"
import { useHistory, useRouteMatch } from "react-router-dom";
import * as moment from "moment"
import { _prop, _marque, _carGenre, _messages, _carStateName } from "_consts";

export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const { params } = useRouteMatch()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)



  const edit = (postData) => {
    setLoading(true)
    postData["state_date"] = postData["state_date"] ? postData["state_date"].format("YYYY-MM-DD HH:mm:ss") : null
    api.put("/cars_state/" + params.id, postData).then((res) => {
      message.info("Bien modifier")
      //history.push("/cars_state")
      setLoading(false)
    })
  }

  useEffect(() => {
    api.get("/cars_state/" + params.id).then((res) => {
      setData(res.data.data)
      setLoadingData(false)
    })
  }, [])



  if (loadingData || !data) {
    return <div style={{height: 200,display: "flex", justifyContent: "center", alignItems:"center"}}>
      <Spin size="large" />
    </div>
  }
  return (
    <Page withBack={true} title="Modifier statut de véhicule">
      <FormBuilder
        initialValues={{
          car_id: data?.car_id,
          car: data?.car,
          state_date: moment(data?.state_date),
          name: data?.name,
          observation: data?.observation
        }}
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
        onFinish={edit}
        loading={loading}
      />
    </Page>
  )
}