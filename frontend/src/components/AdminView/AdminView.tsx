import React, { useState } from "react";
import CrudTable from "../CrudTable/CrudTable";
import { UserFormProps } from "../UserForm/UserForm.types";
import { Button, Modal, Popconfirm, Space } from "antd";
import { AccountRecord, MovementLog } from "@/context/context.types";
import AccountForm from "../../AccountModal/AccountForm";
import { createPortal } from "react-dom";
import MoveUsers from "../MoveUsers/MoveUsers";
import styles from "./AdminView.module.scss";
import { useLog } from "@/context/movementLog";
import { useData } from "@/context/data";

export default function AdminView() {
  const [selectedRecord, setSelectedRecord] = useState<{} | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMoveOpen, setIsMoveOpen] = useState<boolean>(false);
  const { accounts, deleteAccount } = useData();
  const { logs } = useLog();
  const [formActionType, setFormActionType] =
    useState<UserFormProps["action"]>("add");

  const handleEdit = (record: AccountRecord): void => {
    setSelectedRecord(record);
    setFormActionType("edit");
    setIsOpen(true);
  };

  const handleAdd = () => {
    setIsOpen(true);
    setFormActionType("add");
  };

  const onMoveCancel = () => {
    setIsMoveOpen(false);
  };

  const handleModalMove = () => setIsMoveOpen(true);

  const columns = [
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },

    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
    },

    {
      title: "Operation Leader",
      dataIndex: "operationLeader",
      key: "operationLeader",
    },
    {
      title: "Team Consultation",
      dataIndex: "teamConsultation",
      key: "teamConsultation",
    },

    {
      title: "Action",
      key: "action",
      render: (_: string, record: AccountRecord) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteAccount(record.accountName)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const logColumns = [
    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      render: (user: MovementLog) => user,
    },
    {
      title: "New Account",
      dataIndex: "newAccount",
      key: "newAccount",
    },
    {
      title: "Previous Account",
      dataIndex: "oldAccount",
      key: "oldAccount",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: Date) => startDate.toISOString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Date) => endDate.toISOString(),
    },
  ];

  return (
    <>
      <Button onClick={handleModalMove} className={styles.moveBtn}>
        Move User
      </Button>
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

      <CrudTable
        CardProps={{ title: "Logs" }}
        TableProps={{
          columns: logColumns,
          dataSource: logs,
        }}
      />

      <CrudTable
        onClick={handleAdd}
        buttonText="Add new Account"
        CardProps={{ title: "Accounts" }}
        TableProps={{
          columns,
          dataSource: accounts,
        }}
      >
        {createPortal(
          isOpen && (
            <AccountForm
              isOpen={isOpen}
              record={selectedRecord as AccountRecord}
              onCancel={() => setIsOpen(false)}
              action={formActionType}
            />
          ),
          document.body
        )}
      </CrudTable>
    </>
  );
}
