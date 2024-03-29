import { useEffect, useState } from "react";
import { Badge, Button, Modal, Popconfirm, Space } from "antd";
import { UserFormProps } from "@/components/UserForm/UserForm.types";
import { createPortal } from "react-dom";
import { useData } from "@/context/data";
import MainLayout from "@/components/Layouts/MainLayout";
import MoveUsers from "@/components/MoveUsers/MoveUsers";
import CrudTable from "@/components/CrudTable/CrudTable";
import styles from "./users.module.scss";
import {
  Record,
  UserData,
} from "@/components/SuperuserView/SuperUserView.types";
import EditUserForm from "@/components/UserForm/UserForm";
import { getAllUsers } from "@/helpers/users";
import { User } from "@/types/User";

export default function Users() {
  const [selectedRecord, setSelectedRecord] = useState<{} | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMoveOpen, setIsMoveOpen] = useState<boolean>(false);
  const { deleteUser } = useData();
  const { users, setUsers } = useData();
  const [formActionType, setFormActionType] =
    useState<UserFormProps["action"]>("add");

  useEffect(() => {
    const asynF = async () => {
      let token = localStorage.getItem("token");
      token = JSON.parse(token as string).token;
      const data = await getAllUsers(token as string);

      setUsers(data?.data.response);
    };

    asynF();
  }, []);

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
      title: "Team",
      dataIndex: "team",
      key: "team",
      render: (_: string, record: UserData) => <>{record.team}</>,
    },
    {
      title: "CV",
      dataIndex: "cv_url",
      key: "cv_url",
      render: (_: any, record: UserData) => {
        return (
          <Button type="link" className={styles.cv}>
            <a href={record.cv_url} target="_blank">
              See CV
            </a>
          </Button>
        );
      },
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_: string, record: Record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Record): void => {
    setSelectedRecord(record);
    setFormActionType("edit");
    setIsOpen(true);
  };

  const handleAdd = () => {
    setIsOpen(true);
    setFormActionType("add");
  };

  const handleModalMove = () => setIsMoveOpen(true);
  const onMoveCancel = () => setIsMoveOpen(false);

  return (
    <MainLayout>
      <>
        {isMoveOpen &&
          createPortal(
            <Modal
              open={isMoveOpen}
              title="Move User"
              onCancel={onMoveCancel}
              footer={null}
            >
              <MoveUsers onCancel={onMoveCancel} />
            </Modal>,
            document.body
          )}
        <Button onClick={handleModalMove} className={styles.moveBtn}>
          Move User
        </Button>

        <CrudTable
          onClick={handleAdd}
          buttonText="Create user"
          CardProps={{ title: "Users" }}
          TableProps={{
            columns,
            dataSource: users as Record[],
          }}
        >
          <>
            {isOpen && (
              <EditUserForm
                isOpen={isOpen}
                record={selectedRecord as Record}
                onCancel={() => setIsOpen(false)}
                action={formActionType}
                formTitle={
                  formActionType === "add" ? "Create user" : "Edit user"
                }
              />
            )}
          </>
        </CrudTable>
      </>
    </MainLayout>
  );
}
