import {
  Layout,
  Menu,
  Avatar,
  Popover,
  Button,
  Dropdown,
  message,
  Tooltip,
  List,
  Badge,
  Divider
} from 'antd';

import { DownOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import useApi from "useApi"
import { useAppStore } from "stores"
import { Link, useHistory } from "react-router-dom"


export default () => {
  const { user, setToken, setUser } = useAppStore()
  const { api } = useApi()
  const [notifications, setNotifications] = useState([])
  const history = useHistory()

  const getNotifications = () => {
    api.get("/notifications?pageSize=5")
      .then((res) => {
        //console.log()
        setNotifications(res.data.data)
      })
  }
  useEffect(() => {
    getNotifications()
    const intr = setInterval(getNotifications, 60000)
    return () => clearInterval(intr)
  }, [])

  const NotificatiobContent = () => {
    return (
      <div>
        <List
          style={{ width: 300 }}
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a onClick={() => {
                  api.post("/notifications/" + item.id).then(() => {
                    history.push(item.url)
                  })
                }} >{item.title}</a>}
                description={`${item.sub_title} | ${item.is_read ? "DEJA VU" : "Non vu"}`}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Link to={"/notifications"} >Plus des notifications</Link>
      </div>
    )
  }

  function handleMenuClick(e) {
    if (e.key === "1") {
      setToken(null)
      setUser(null)
    }
  }
  let nb = 0
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].is_read == false) {
      nb++
    }
  }
  return (
    <Layout.Header style={{
      height: 48,
      backgroundColor: "white",
      position: 'fixed',
      zIndex: 2,
      width: 'calc(100% - 280px)',
      boxShadow: "0 1px 4px rgba(0,21,41,.08)",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }} >
      <Popover trigger="click" title="Notifications" content={NotificatiobContent}>
        <Button icon={<BellOutlined />} style={{ marginRight: 10 }}>
          <Badge count={nb} />
        </Button>
      </Popover>
      <Dropdown trigger="click" placement="bottomRight" overlay={() => (
        <Menu >
          <Menu.Item onClick={handleMenuClick} key="1" icon={<LogoutOutlined style={{ color: "red" }} />}>
            Se déconnecter
          </Menu.Item>
        </Menu>
      )}>
        <Button>
          {user.username} <DownOutlined />
        </Button>
      </Dropdown>
    </Layout.Header>
  )
}