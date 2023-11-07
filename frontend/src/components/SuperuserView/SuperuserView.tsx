import React from "react";
import Card from "../Card/Card";
import { Input, Table } from "antd";

export default function SuperuserView() {
  const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    },
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password",
    },
    {
      name: "Peter Parker",
      email: "peter.parker@example.com",
      password: "password",
    },
    {
      name: "Mary Jane Watson",
      email: "mary.jane.watson@example.com",
      password: "password",
    },
    {
      name: "Bruce Wayne",
      email: "bruce.wayne@example.com",
      password: "password",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (text, record) => (
        <Input value={text} onChange={(e) => (record.name = e.target.value)} />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
      render: (text, record) => (
        <Input value={text} onChange={(e) => (record.email = e.target.value)} />
      ),
    },
    {
      title: "Encrypted Password",
      dataIndex: "password",
      key: "password",
      editable: true,
      render: (text, record) => (
        <Input
          type="password"
          value={text}
          onChange={(e) => (record.password = e.target.value)}
        />
      ),
    },
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={users} size="middle" />
    </Card>
  );
}
