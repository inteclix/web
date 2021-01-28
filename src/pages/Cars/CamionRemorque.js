import React from "react"
import { Form, Input, Button, Checkbox, message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _prop, _messages, _carGenre, _marque } from "_consts";

import { camionRemorqueFormItems } from "./columns"

export default function () {
  const { api } = useAppStore()

  const add = (data) => {
    api.post("/remorques", data).then((res) => {
      message.info("Bien ajouter")
    })
  }
  return (
    <Page title="Camion > Remorque">
      <FormBuilder formItems={camionRemorqueFormItems} onFinish={add} />
    </Page>
  )
}