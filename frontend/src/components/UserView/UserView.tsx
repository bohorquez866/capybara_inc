import React, { useState } from "react";
import Card from "../Card/Card";
import styles from "./UserView.module.scss";
import { Button, Input, Select, Table } from "antd";
import { useAuth } from "@/context/auth";
import { User } from "@/types/User";
import { createPortal } from "react-dom";
import RegularUserForm from "@/components/regularUserForm";
import { Record, UserData } from "../SuperuserView/SuperUserView.types";

export default function UserView() {
  const { Option } = Select;
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formActionType = "edit";

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
      editable: false,
    },

    {
      title: "CV URL",
      dataIndex: "cv_url",
      key: "cv_url",
    },

    {
      title: "English level",
      dataIndex: "english_level",
      key: "english_level",
    },
  ];

  return (
    <Card
      CardProps={{
        title: "User Details",
        className: styles.card,
      }}
    >
      <Button onClick={() => setIsOpen(true)}>Edit Info</Button>
      <Table
        columns={columns}
        dataSource={[user as User]}
        pagination={false}
        size="middle"
      />

      {isOpen &&
        createPortal(
          <RegularUserForm
            isOpen={isOpen}
            record={user}
            onCancel={() => setIsOpen(false)}
            action={formActionType}
            formTitle={"Edit user information"}
          />,
          document.body
        )}
    </Card>
  );
}
