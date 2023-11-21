import React, { useEffect, useMemo, useState } from "react";
import Card from "../Card/Card";
import styles from "./UserView.module.scss";
import { Button, Input, Select, Table } from "antd";
import { useAuth } from "@/context/auth";
import { User } from "@/types/User";
import { createPortal } from "react-dom";
import RegularUserForm from "@/components/regularUserForm";
import { getUserInfo } from "@/helpers/login";

export default function UserView() {
  const { user, updateUser } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState(0);
  const formActionType = "edit";

  useEffect(() => {
    if (update === 0) {
      const asyncF = async () => {
        const userID = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const parsedToken: { token: string } = JSON.parse(token as string);

        if (userID) {
          const user = await getUserInfo(userID, parsedToken?.token);
          const data = user?.data as { user: User };
          updateUser(data.user as User);
        }
      };
      asyncF();
      setUpdate(update + 1);
    }
  }, [update, user]);

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
