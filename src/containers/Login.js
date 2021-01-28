import React, { useState } from "react"
import { Form, Input, Button, Checkbox, message, Divider } from 'antd';


import { useHistory, useLocation } from "react-router-dom"
import { useAppStore } from "stores"
import useApi from "useApi";
import * as _consts from "_consts"

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


export default function Login() {
  let history = useHistory();
  let { api, setToken } = useApi()
  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(true)
    api
      .post("auth/login", values)
      .then(({ data }) => {
        setToken(data.data.token);
        document.location.reload();
      })
      .catch((err) => {
        setLoading(false)
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">

      <Form
        layout="vertical"
        name="basic"
        initialValues={{
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          width: 350,
          padding: 20,
          border: "1px solid lightgray",
          borderRadius: 5
        }}

      >
        <h2>Authentification</h2>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: _consts._messages["required"],
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: _consts._messages["required"],
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Divider />
        <Form.Item >
          <Button loading={loading} type="primary" style={{ width: "100%" }} htmlType="submit">
            Connecté
        </Button>
        </Form.Item>
      </Form>
    </div>

  );
}