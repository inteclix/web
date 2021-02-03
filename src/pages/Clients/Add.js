import React, { useState } from "react"
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
  const [loading, setLoading] = useState(false)

  const add = (data) => {
    setLoading(true);
    api.post("/clients", data).then((res) => {
      message.info("Bien ajouter")
      history.push("/clients")
    }).catch(() => {
      setLoading(false);
    })
  }
  return (
    <Page title="Nauveau client(Structure)" selectedSiderKey="add-clients">
      <FormBuilder loading={loading} formItems={formItems} onFinish={add} />
    </Page>
  )
}