import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { FormInstance } from "antd/lib/form";
import { User } from "@/types/User";
import { createUser } from "@/helpers/UserHttp";
import openNotification from "@/components/Notification";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: User, form: FormInstance) => {
    await createUser(values)
      .then((data) => {
        setLoading(true);
        form.resetFields();
        setLoading(false);
        openNotification({
          type: "success",
          message: "User created successfully",
        });
      })
      .catch((error) => {
        openNotification({
          type: "error",
          message: "Error creating user",
          description: "Something went wrong",
        });
        setLoading(false);
      });
  };

  const onFinishFailed = () => {
    openNotification({
      type: "error",
      message: "Error creating user",
      description: "Something went wrong",
    });
  };

  return (
    <Form
      form={form}
      onFinish={(values) => handleSubmit(values as User, form)}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="English Level"
        name="english_level"
        rules={[
          {
            required: true,
            message: "Please select your English level",
          },
        ]}
      >
        <Select>
          <Select.Option value="beginner">Beginner</Select.Option>
          <Select.Option value="intermediate">Intermediate</Select.Option>
          <Select.Option value="advanced">Advanced</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: "Please select your role",
          },
        ]}
      >
        <Select>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
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
            message: "Please input your password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="CV URL"
        name="cv_url"
        rules={[
          {
            required: true,
            message: "Please enter your CV URL",
          },
          {
            type: "url",
            message: "Please enter a valid URL",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please enter your username",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter your name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
