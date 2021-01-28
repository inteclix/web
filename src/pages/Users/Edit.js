import React, { useEffect, useState } from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useRouteMatch } from "react-router-dom";

import { formItems } from "./columns"

export default function () {
  const { params } = useRouteMatch()
  const { api } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  const edit = (data) => {
    api.put("/auth/users/" + params.id, data).then((res) => {
      message.info("Bien ajouter")
    })
  }

  useEffect(() => {
    api.get("/auth/users/" + params.id).then(({ data }) => {
      setData(data.data)
      setLoading(false)
    })
  }, [])

  return (
    <Page withBack={true} loading={loading} title="Modifie l'utilisateur" selectedSiderKey="list-users">
      <FormBuilder formItems={formItems} initialValues={data} onFinish={edit} />
    </Page>
  )
}