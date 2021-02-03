import React, { useState } from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom"
import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";

import { formItems } from "./columns"
import { Loading3QuartersOutlined } from "@ant-design/icons";

export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const add = (data) => {
    setLoading(true);
    api.post("/drivers", data).then((res) => {
      message.info("Bien ajouter")
      history.push("/drivers")
    }).catch(() => {
      setLoading(false);
    })
  }
  return (
    <Page title="Nauveau conducteur" selectedSiderKey="add-drivers">
      <FormBuilder loading={loading} formItems={formItems} onFinish={add} />
    </Page>
  )
}