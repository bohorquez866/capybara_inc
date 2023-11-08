import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";

import { useAccount } from "@/context/accounts";
import { AccountFormProps } from "./AccountForm.types";

export default function UserModa({
  isOpen,
  onCancel,
  record,
  action,
}: AccountFormProps) {
  const { Item } = Form;
  const [form] = Form.useForm();
  const { updateAccount, addAccount } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (action === "add") record = null;

  const handleOk = () => {
    form
      .validateFields([
        "accountName",
        "clientName",
        "operationLeader",
        "teamConsultation",
      ])
      .then((values) => {
        setIsSubmitting(true);
        const updatedRecord = { ...record, ...values };
        console.log(values);

        action == "add"
          ? addAccount(updatedRecord)
          : updateAccount(updatedRecord);
        setIsSubmitting(false);
        onCancel();
      })
      .catch((error) => console.error("Validation error:", error));
  };

  return (
    <Modal open={isOpen} title="Edit User" onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Item
          label="Account Name"
          name="accountName"
          rules={[{ required: true, message: "Please enter a name" }]}
          initialValue={record?.accountName}
        >
          <Input />
        </Item>

        <Item
          label="Client Name"
          name="clientName"
          rules={[{ required: true, message: "Please enter a client name" }]}
          initialValue={record?.clientName}
        >
          <Input />
        </Item>

        <Item
          label="Operation Leader"
          name="operationLeader"
          rules={[{ required: true }]}
          initialValue={record?.operationLeader}
        >
          <Input />
        </Item>

        <Item
          label="Team Consultation"
          name="teamConsultation"
          rules={[{ required: true }]}
          initialValue={record?.teamConsultation}
        >
          <Input />
        </Item>

        <Item>
          <Button
            type="primary"
            block
            onClick={handleOk}
            disabled={isSubmitting}
          >
            {action === "add" ? "Add " : "Save"}
          </Button>
        </Item>
      </Form>
    </Modal>
  );
}
