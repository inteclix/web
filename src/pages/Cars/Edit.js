import React, { useEffect, useState } from "react"
import { Form, Input, Button, Skeleton, message } from 'antd';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useHistory, useRouteMatch } from "react-router-dom";

import { formItems } from "./columns"

export default function () {
  const { params } = useRouteMatch()
  const { api } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  const edit = (data) => {
    api.put("/cars/" + params.id, data).then((res) => {
      message.info("Bien modifier")
    })
  }
  useEffect(() => {
    api.get("/cars/" + params.id).then(({ data }) => {
      setData(data.data)
      setLoading(false)
    })
  }, [])

  return (
    <Page withBack={true} loading={loading} title={"Modifie véhicule : " + data.matricule} selectedSiderKey="list-cars">
      <FormBuilder formItems={formItems} initialValues={data} onFinish={edit} />
    </Page>
  )
}