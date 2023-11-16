"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { mockLogin } from "@/helpers/loginHttp";
import { LoginRequest } from "@/types/http";
import { setToken } from "@/helpers/setToken";
import openNotification from "@/components/Notification/Notification";
import { useAuth } from "@/context/auth";
import { emailRegex } from "@/helpers/regex";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
        setToken(response?.token as string);
        login();
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
            pattern: emailRegex,
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
