import React from "react";
import Card from "../Card/Card";
import styles from "./UserView.module.scss";
import { Input, Select, Table } from "antd";
import { useAuth } from "@/context/auth";
import { User } from "@/types/User";

export default function UserView() {
  const { Option } = Select;
  const { user, setUser } = useAuth();
  const { TextArea } = Input;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (text: string) => (
        <Input
          value={text}
          onChange={(e) => setUser({ ...user, name: e.target.value } as User)}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: false,
      // render: (text: any) => <Input value={text} disabled />,
    },

    {
      title: "CV URL",
      dataIndex: "cv_url",
      key: "cv_url",
      editable: true,
      render: (text: any) => (
        <TextArea
          value={text}
          autoSize={false}
          onChange={(e) => setUser({ ...user, cv_url: e.target.value } as User)}
        />
      ),
    },

    {
      title: "English level",
      dataIndex: "english_level",
      key: "english_level",
      editable: true,
      render: (text: any) => (
        <Select
          value={text}
          onChange={(value) =>
            setUser({ ...user, english_level: value } as User)
          }
        >
          <Option value="C2">C2</Option>
          <Option value="C1">C1</Option>
          <Option value="B2">B2</Option>
          <Option value="B1">B1</Option>
          <Option value="A2">A2</Option>
          <Option value="A1">A1</Option>
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
        dataSource={[user as User]}
        pagination={false}
        size="middle"
      />
    </Card>
  );
}
