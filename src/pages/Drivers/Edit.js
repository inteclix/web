import React, { useEffect, useState } from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom"

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useRouteMatch } from "react-router-dom";

import { formItems } from "./columns"

export default function () {
  const { params } = useRouteMatch()
  const { api } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const history = useHistory()

  const edit = (data) => {
    api.put("/drivers/" + params.id, data).then((res) => {
      message.info("Bien modifier")
      history.push("/drivers")
    })
  }

  useEffect(() => {
    api.get("/drivers/" + params.id).then(({ data }) => {
      setData(data.data)
      setLoading(false)
    })
  }, [])

  return (
    <Page withBack={true} loading={loading} title="Modifie conducteur" selectedSiderKey="list-drivers">
      <FormBuilder formItems={formItems} initialValues={data} onFinish={edit} />
    </Page>
  )
}