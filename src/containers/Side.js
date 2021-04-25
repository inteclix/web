import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import config from "config"
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { hasRole } from 'utils';
import { useAppStore } from 'stores';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default () => {
  const history = useHistory()
  const { user } = useAppStore()
  const { selectedSiderKey } = useAppStore()
  return (
    <Sider
      width={200}
      style={{
        overflow: 'auto',
        height: 'calc(100vh - 32px)',
        marginTop: 32,
        position: 'fixed',
        left: 0,
        //    background: "linear-gradient(0deg, rgba(42, 32, 132, 1) 0%, rgba(48, 83, 209, 1) 37%, rgba(42, 32, 132, 1) 100%)"
      }}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={selectedSiderKey}>
        {
          config.routes.map((r, i) => {
            if (r.role) {
              if (r.routes) {
                return (
                  hasRole(user, r.role) ? <SubMenu key={r.name} icon={r.icon} title={r.label}>
                    {
                      r.routes.map((rr, ii) => {
                        if (rr.role) {
                          return hasRole(user, rr.role) ? (
                            rr.hideInSide ? undefined : <Menu.Item  onClick={() => history.push(rr.path)} key={rr.name}>{rr.label}</Menu.Item>
                          ) : null
                        } else {
                          return rr.hideInSide ? undefined : <Menu.Item  onClick={() => history.push(rr.path)} key={rr.name}>{rr.label}</Menu.Item>
                        }
                      })
                    }
                  </SubMenu> : null
                )
              } else {
                return hasRole(user, r.role) ? (r.hideInSide ? undefined : <Menu.Item onClick={() => history.push(r.path)} key={r.name} icon={r.icon}>{r.label}</Menu.Item>) : null
              }
            } else {
              if (r.routes) {
                return (
                  <SubMenu key={r.name} icon={r.icon} title={r.label}>
                    {
                      r.routes.map((rr, ii) => {
                        if (rr.role) {
                          return hasRole(user, rr.role) ? (
                            rr.hideInSide ? undefined : <Menu.Item  onClick={() => history.push(rr.path)} key={rr.name}>{rr.label}</Menu.Item>
                          ) : null
                        } else {
                          return (
                            rr.hideInSide ? undefined : <Menu.Item  onClick={() => history.push(rr.path)} key={rr.name}>{rr.label}</Menu.Item>
                          )
                        }
                      })
                    }
                  </SubMenu>
                )
              } else {
                return r.hideInSide ? undefined : <Menu.Item  onClick={() => history.push(r.path)} key={r.name} icon={r.icon}>{r.label}</Menu.Item>
              }
            }
          })
        }
      </Menu>
    </Sider>
  )
}