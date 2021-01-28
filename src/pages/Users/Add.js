import React from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";

import { formItems } from "./columns"

export default function () {
  const { api } = useAppStore()

  const add = (data) => {
    api.post("/auth/users", data).then((res) => {
      message.info("Bien ajouter")
    })
  }
  return (
    <Page title="Nauveau Utilisateur"  selectedSiderKey="add-users">
      <FormBuilder formItems={formItems} onFinish={add} />
    </Page>
  )
}