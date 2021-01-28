import React from "react"
import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from "react-router-dom"
import { Layout } from 'antd';

import NotFound from "components/NotFound"

import Header from "containers/Header"
import Side from "containers/Side"

import config from "config"
import { useAppStore } from 'stores';
import { hasRole } from "utils";

const { Content } = Layout;

export default function () {
  const { user } = useAppStore()
  const t = []
  for (let i = 0; i < 100; i++) {
    t.push(i)
  }
  const renderSubMenuRoutes = (routes) => {
    return (
      <Switch>
        {routes.map((r, i) => {
          if (r.role) {
            return hasRole(user, r.role) ?
              <Route key={i} exact={r.exact} component={r.component} path={r.path} />
              : null
          } else {
            return <Route key={i} exact={r.exact} component={r.component} path={r.path} />
          }
        })}
      </Switch>
    )
  }
  const renderRoutes = () => {
    return config.routes.map((r, i) => {
      if (r.role) {
        return (
          hasRole(user, r.role) ? <Switch>
            {
              r.routes ?
                renderSubMenuRoutes(r.routes) :
                <Route exact={r.exact} component={r.component} path={r.path} />
            }
          </Switch> : null
        )
      } else {
        return (
          <Switch>
            {
              r.routes ?
                renderSubMenuRoutes(r.routes) :
                <Route exact={r.exact} component={r.component} path={r.path} />
            }
          </Switch>
        )
      }
    })
  }
  return (
    <BrowserRouter>
      <Layout>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 280,
          height: 48,
          backgroundColor: "white",
          padding: 5,
          textAlign: "center",

        }}>
          <Link to="/">
            <h1 style={{ color: "black" }}>GPark</h1>
          </Link>
        </div>
        <Side />
        <Layout style={{ marginLeft: 280, overflowY: "scroll" }}>
          <Header />
          <Content style={{ paddingTop: 48 }}>
            {renderRoutes()}
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter >
  )
}