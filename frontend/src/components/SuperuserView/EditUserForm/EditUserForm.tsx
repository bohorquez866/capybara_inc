import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { EditUserFormProps } from "./EditUserForm.types";
import { useUser } from "@/context/Users";
import { generatePassword } from "@/helpers/generatePassword";

export default function EditUserModa({
  isOpen,
  onCancel,
  record,
}: EditUserFormProps) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState(generatePassword());

  const { Item } = Form;
  const { updateUser } = useUser();

  useEffect(() => {
    if (isOpen) {
      const newPassword = generatePassword();
      setPassword(newPassword);
      form.setFieldsValue({ password: newPassword });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOk = () => {
    form
      .validateFields(["name", "email", "password"])
      .then((values) => {
        setIsSubmitting(true);
        const updatedRecord = { ...record, ...values };
        console.log("Updated record:", updatedRecord);
        updateUser(values);
        setIsSubmitting(false);
        onCancel();
      })
      .catch((error) => console.error("Validation error:", error));
  };

  return (
    <Modal open={isOpen} title="Edit User" onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical">
        <Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
          initialValue={record?.name}
        >
          <Input />
        </Item>
        <Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Please enter a valid email address" },
            { required: true, message: "Please enter an email address" },
          ]}
          initialValue={record?.email}
        >
          <Input />
        </Item>

        <Item
          label="password"
          name="password"
          rules={[{ required: true }]}
          initialValue={password}
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
            Save Changes
          </Button>
        </Item>
      </Form>
    </Modal>
  );
}
