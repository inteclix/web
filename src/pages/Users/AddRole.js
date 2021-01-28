import React from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";

import { roleFormItems } from "./columns"
import { useHistory } from "react-router-dom";
export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const add = (data) => {
    data["name"] = data["name"].toUpperCase()
    api.post("/roles", data).then((res) => {
      message.info("Bien ajouter")
      history.push("/roles")
    })
  }
  return (
    <Page title="Nauveau Role">
      <FormBuilder formItems={roleFormItems} onFinish={add} />
    </Page>
  )
}