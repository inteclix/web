import React from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";

import { formItems } from "./columns"
import { useHistory } from "react-router-dom";

export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const add = (data) => {
    api.post("/missions", data).then((res) => {
      message.info("Bien ajouter")
      history.push("/missions")
    })
  }
  return (
    <Page title="Nouvelle mission">
      <FormBuilder formItems={formItems} onFinish={add} />
    </Page>
  )
}