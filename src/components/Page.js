import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";


import { Button, Skeleton, PageHeader } from 'antd';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';

import config from "config"
import Page from "components/Page"
import { useAppStore } from "stores";

import { _postes, _messages } from "_consts";
export default ({ title, subTitle, withBack, loading, selectedSiderKey, children }) => {
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

  if (loading) {
    return (
      <div >
        <PageHeader
          onBack={() => history.goBack()}
          backIcon={withBack ? <ArrowLeftOutlined /> : null}
          title={title}
          subTitle={subTitle}
        />,
        <div style={{ padding: 15 }}>
          <Skeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        onBack={() => history.goBack()}
        backIcon={withBack ? <ArrowLeftOutlined /> : null}
        title={title}
        subTitle={subTitle}
      />
      <div style={{ padding: 15 }}>
        {children}
      </div>
    </div>
  )
}