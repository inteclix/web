import React, { useEffect, useState } from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useRouteMatch } from "react-router-dom";

import { formItems } from "./columns"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function () {
  const { params } = useRouteMatch()
  const { api } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const history = useHistory()
  const edit = (data) => {
    api.put("/clients/" + params.id, data).then((res) => {
      message.info("Bien modifier")
      history.push("/clients")
    })
  }

  useEffect(() => {
    api.get("/clients/" + params.id).then(({ data }) => {
      setData(data.data)
      setLoading(false)
    })
  }, [])

  return (
    <Page withBack={true} loading={loading} title="Modifie client" selectedSiderKey="list-clients">
      <FormBuilder formItems={formItems} initialValues={data} onFinish={edit} />
    </Page>
  )
}