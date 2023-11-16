import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

import { AccountFormProps } from "./AccountForm.types";
import { useData } from "@/context/data";

export default function UserModa({
  isOpen,
  onCancel,
  record,
  action,
}: AccountFormProps) {
  const { Item } = Form;
  const [form] = Form.useForm();
  const { updateAccount, addAccount } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAdd = action === "add";

  if (isAdd) record = null;

  const handleOk = () => {
    form
      .validateFields(["accountName", "clientName", "operationLeader"])
      .then((values) => {
        setIsSubmitting(true);
        const updatedRecord = { ...record, ...values };
        console.log(values);

        isAdd ? addAccount(updatedRecord) : updateAccount(updatedRecord);
        setIsSubmitting(false);
        onCancel();
      })
      .catch((error) => console.error("Validation error:", error));
  };

  return (
    <Modal
      open={isOpen}
      title={isAdd ? "Create account" : "Edit account"}
      onCancel={onCancel}
      footer={null}
    >
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

        <Item>
          <Button
            type="primary"
            block
            onClick={handleOk}
            disabled={isSubmitting}
          >
            {isAdd ? "Add " : "Save"}
          </Button>
        </Item>
      </Form>
    </Modal>
  );
}
