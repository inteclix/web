import React from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";
import {useHistory} from "react-router-dom"
import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";

import { formItems } from "./columns"

export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const add = (data) => {
    api.post("/drivers", data).then((res) => {
      message.info("Bien ajouter")
      history.push("/drivers")
    })
  }
  return (
    <Page title="Nauveau conducteur" selectedSiderKey="add-drivers">
      <FormBuilder formItems={formItems} onFinish={add} />
    </Page>
  )
}