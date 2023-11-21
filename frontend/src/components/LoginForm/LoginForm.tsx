"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { getUserInfo, loginRequest } from "@/helpers/login";
import { LoginRequest, LoginResponse } from "@/types/http";
import openNotification from "@/components/Notification/Notification";
import { useAuth } from "@/context/auth";
import { emailRegex } from "@/helpers/regex";
import styles from "./LoginForm.module.scss";
import { User } from "@/types/User";
import { setUser } from "@/helpers/setUser";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login: authLogin, updateUser } = useAuth();
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

    loginRequest(values)
      .then(async (response: any) => {
        authLogin(response?.token);
        openNotification({
          type: "success",
          message: "logged in successfully",
        });
        setLoading(false);
        setUser(response.id);
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
          className={styles.button}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
