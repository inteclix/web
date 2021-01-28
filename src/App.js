import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { AppProvider } from "./stores";

import Main from "containers/Main";
import Login from 'containers/Login';

import useApi from 'useApi';

export default function App() {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const { api, setToken, token } = useApi();
  const [selectedSiderKey, setSelectedSiderKey] = useState("")
  const loadCurentUser = () => {
    let isSubscribed = true;
    setIsLoadingUser(true);
    api
      .get("/auth/me")
      .then(({ data }) => {
        if (isSubscribed) {
          setUser(data.data);
          setIsLoadingUser(false);
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setUser(null);
          setIsLoadingUser(false);
        }
      });
    return () => (isSubscribed = false);
  }

  useEffect(loadCurentUser, [token]);
  //useEffect(loadCurentUser, [user, api]);

  if (isLoadingUser) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AppProvider value={{ user, setUser, api, setToken, selectedSiderKey, setSelectedSiderKey }}>
      {user ? <Main /> : <Login />}
    </AppProvider>
  )
};
