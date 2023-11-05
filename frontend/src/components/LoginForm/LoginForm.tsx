"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { login, mockLogin } from "@/helpers/loginHttp";
import { LoginRequest } from "@/types/http";
import { setToken } from "@/helpers/setToken";
import openNotification from "@/components/Notification";
import { redirect } from "next/navigation";
import { formStyles } from "../../pages/login/LoginForm.styles";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let parsedToken;

    if (token) {
      parsedToken = JSON.parse(token);
    }

    if (parsedToken?.token) router.push("/");
  }, [router]);

  const onFinish = (values: LoginRequest) => {
    setLoading(true);
    mockLogin(values)
      .then((response) => {
        console.log(response);

        setToken(response?.token as string);
        openNotification({
          type: "success",
          message: "logged in successfully",
        });
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);

        openNotification({
          type: "error",
          message: "Error logging in",
          description: error.message,
        });
        setLoading(false);
      });
  };

  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
          {
            message: "enter a valid email",
            pattern: new RegExp(
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            ),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "100%" }}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
