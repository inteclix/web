import { useState, useMemo } from "react";
import { message } from "antd"
import axios from "axios"

export default () => {
  const API_URL = "/api"
  const [token, setToken] = useState(localStorage.getItem("token"))
  const updateToken = (token) => {
    localStorage.setItem("token", token)
    setToken(token)
  }
  return useMemo(() => {
    const api = axios.create({
      baseURL: API_URL,
      headers: {
        'x-access-token': token,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    })
    api.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401 && error.response.data.message !== "Token not provided.") {
        //message.error("Vous ñ'avez pas l'autorisation")
      } if (error.response.status === 401 && error.response.data.message === "An error while decoding token.") {
        
      } else {
        const msg = error?.response?.data?.message ? error?.response?.data?.message : error.message
        message.error(msg)
      }

      return Promise.reject(error);
    });
    return {
      api: api,
      token,
      setToken: updateToken
    }
  }, [token])
}
