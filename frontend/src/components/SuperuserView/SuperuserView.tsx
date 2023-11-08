import Card from "../Card/Card";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { Record } from "./SuperUserView.types";
import { useState } from "react";
import { createPortal } from "react-dom";
import EditUserForm from "./UserForm/UserForm";
import { useUser } from "@/context/Users";
import { titleStyles } from "../../pages/login/LoginForm.styles";
import { UserFormProps } from "./UserForm/UserForm.types";
import CrudTable from "../CrudTable/CrudTable";

export default function SuperuserView() {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { users, deleteUser } = useUser();
  const [formActionType, setFormActionType] =
    useState<UserFormProps["action"]>("add");

  const handleEdit = (record: Record): void => {
    setSelectedRecord(record);
    setFormActionType("edit");
    setIsOpen(true);
  };

  const handleAdd = () => {
    setIsOpen(true);
    setFormActionType("add");
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
      render: (_: any, record: Record) => "**********",
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
    <CrudTable
      onClick={handleAdd}
      buttonText="Add new admin"
      CardProps={{ title: 'title: "Admins",' }}
      TableProps={{
        columns,
        dataSource: users as Record[],
      }}
    >
      <EditUserForm
        isOpen={isOpen}
        record={selectedRecord as Record}
        onCancel={() => setIsOpen(false)}
        action={formActionType}
      />
    </CrudTable>
  );
}
