import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { login } from "@/helpers/loginHttp";
import { LoginRequest } from "@/types/http";
import { setToken } from "@/helpers/setToken";
import openNotification from "@/components/Notification";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values: LoginRequest) => {
    setLoading(true);
    login(values)
      .then((response) => {
        setToken(response.data.token);
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
      style={{ maxWidth: 300 }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
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
