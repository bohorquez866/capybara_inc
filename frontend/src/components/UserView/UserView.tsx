import React from "react";
import Card from "../Card/Card";
import styles from "./UserView.module.scss";
import { Col, Input, Row, Select, Space, Table, Typography } from "antd";
import { useAuth } from "@/context/auth";

export default function UserView() {
  const { Title, Text } = Typography;
  const { user } = useAuth();

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
      render: (text: any, record: { email: string }) => (
        <Input value={text} onChange={(e) => (record.email = e.target.value)} />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      editable: true,
      render: (text, record) => (
        <Select value={text} onChange={(value) => (record.role = value)}>
          <Select.Option value="USER">USER</Select.Option>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="SUPERUSER">SUPERUSER</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <Card
      CardProps={{
        title: "User Details",
        className: styles.card,
      }}
    >
      <Table
        columns={columns}
        dataSource={[user as Object]}
        pagination={false}
        size="middle"
      />
    </Card>
  );
}
