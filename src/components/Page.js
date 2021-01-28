import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";


import { Button, Skeleton } from 'antd';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';

import config from "config"
import Page from "components/Page"
import { useAppStore } from "stores";

import { _postes, _messages } from "_consts";
export default ({ title, withBack, loading, selectedSiderKey, children }) => {
  const history = useHistory()
  const { setSelectedSiderKey } = useAppStore()
  useEffect(() => {
    if (!selectedSiderKey) {
      setSelectedSiderKey("")
    } else {
      setSelectedSiderKey(selectedSiderKey)
    }
  }, [])
  useEffect(() => {
    title ? document.title = title + " - " + config.appName : document.title = config.appName
  }, [title])

  if (loading && withBack) {
    return (
      <div style={{ padding: 15 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}></Button>
        <hr />
        <Skeleton />
      </div>
    )
  }
  if (loading) {
    return (
      <div style={{ padding: 15 }}>
        <Skeleton />
      </div>
    )
  }
  return (
    <div style={{ padding: 15 }}>
      {
        withBack &&
        <>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}></Button>
            <h1 style={{ marginLeft: 20 }}>{title}</h1>
          </div>
          <hr />
        </>
      }
      {
        !withBack &&
        <>
          <h1>{title}</h1>
          <hr />
        </>
      }
      {children}
    </div>
  )
}