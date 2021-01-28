import React from "react"
import { Form, Input, Button, Checkbox, message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _prop, _messages, _carGenre, _marque } from "_consts";

import { formItemsCarState } from "./columns"
import {useHistory} from "react-router-dom"
export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const add = (data) => {
    data["state_date"] = data["state_date"] ? data["state_date"].format("YYYY-MM-DD HH:mm:ss") : null
    api.post("/cars_state", data).then((res) => {
      message.info("Bien ajouter")
      history.push("/cars_state")
    })
  }
  return (
    <Page title="Changement statut de véhicule">
      <FormBuilder formItems={formItemsCarState} onFinish={add} />
    </Page>
  )
}