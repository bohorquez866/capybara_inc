import Card from "../Card/Card";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { EditFilled } from "@ant-design/icons";
import { Record } from "./SuperUserView.types";
import { users as initialUsers } from "./data";
import { useState } from "react";
import openNotification from "../Notification/Notification";
import { setUser } from "../../helpers/setUser";
import { createPortal } from "react-dom";
import EditUserForm from "./EditUserForm/EditUserForm";
import { useUser } from "@/context/Users";

export default function SuperuserView() {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [users, setUsers] = useState<Record[]>(initialUsers);
  const { users, deleteUser } = useUser();

  const handleEdit = (record: Record): void => {
    setSelectedRecord(record);
    setIsOpen(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            Edit
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record.email)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      {createPortal(
        <EditUserForm
          isOpen={isOpen}
          record={selectedRecord as Record}
          onCancel={() => setIsOpen(false)}
        />,
        document.body
      )}
      <Table columns={columns} dataSource={users as Record[]} size="middle" />
    </Card>
  );
}
