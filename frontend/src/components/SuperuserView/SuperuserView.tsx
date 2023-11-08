import Card from "../Card/Card";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { EditFilled } from "@ant-design/icons";
import { Record } from "./SuperUserView.types";
import { users as initialUsers } from "./data";
import { useState } from "react";

export default function SuperuserView() {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [users, setUsers] = useState<Record[]>(initialUsers);

  const handleEdit = (record: Record) => {
    console.log(record.isEditable);

    if (record.isEditable) return setIsEditable(false);

    setIsEditable(true);
    setSelectedRecord(record);
  };

  const handleDelete = (record: Record) => {
    const updatedUsers = users.filter((user) => user.email !== record.email);
    setUsers(updatedUsers);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Record) => {
        if (record.isEditable) {
          return (
            <>
              <Input
                value={text}
                onChange={(e) => (record.name = e.target.value)}
              />
            </>
          );
        }

        return (
          <>
            <EditFilled onClick={() => handleEdit(record)} />
            {text}
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },

    {
      title: "Action",
      key: "action",
      render: (_: string, record: Record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            {record.isEditable ? "Save" : "Edit"}
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={users as Record[]} size="middle" />
    </Card>
  );
}
