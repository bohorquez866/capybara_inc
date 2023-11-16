import AccountForm from "@/components/AdminView/AccountModal/AccountForm";
import CrudTable from "@/components/CrudTable/CrudTable";
import MainLayout from "@/components/Layouts/MainLayout";
import { UserFormProps } from "@/components/UserForm/UserForm.types";
import { AccountRecord } from "@/context/context.types";
import { useData } from "@/context/data";
import { Button, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function Accounts() {
  const [selectedRecord, setSelectedRecord] = useState<{} | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMoveOpen, setIsMoveOpen] = useState<boolean>(false);
  const { accounts, deleteAccount } = useData();
  const [formActionType, setFormActionType] =
    useState<UserFormProps["action"]>("add");

  console.log(accounts);

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
      render: (_: any, record: AccountRecord) => (
        <>{record.teamConsultation.map((member) => member.email)}</>
      ),
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

  return (
    <MainLayout>
      <CrudTable
        onClick={handleAdd}
        buttonText="Add new Account"
        CardProps={{ title: "Accounts" }}
        TableProps={{
          columns,
          dataSource: [...accounts],
        }}
      >
        <>
          {isOpen &&
            createPortal(
              <AccountForm
                isOpen={isOpen}
                record={selectedRecord as AccountRecord}
                onCancel={() => setIsOpen(false)}
                action={formActionType}
              />,
              document.body
            )}
        </>
      </CrudTable>
    </MainLayout>
  );
}
