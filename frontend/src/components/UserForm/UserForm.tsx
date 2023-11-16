import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, SelectProps } from "antd";
import { UserFormProps } from "./UserForm.types";
import { useData } from "@/context/data";
import { generatePassword } from "@/helpers/generatePassword";
import styles from "./UserForm.module.scss";
import { Role } from "@/hooks/useRoleAccess";
import {
  emailInputRules,
  passwordInputRules,
  requiredInputRules,
} from "@/helpers/antdFormRules";

export default function UserModal({
  isOpen,
  onCancel,
  record,
  action,
  formTitle,
}: UserFormProps) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState(generatePassword());
  const [role] = useState<string>(Role.ADMIN);
  const { Item } = Form;
  const { updateUser, addUser } = useData();
  const isAdd = action === "add";

  const fieldsToValidate = ["name", "email", "role"];

  if (isAdd) {
    fieldsToValidate.push("password");
  }

  const options: SelectProps["options"] = [
    {
      label: Role.USER,
      value: Role.USER,
    },

    {
      label: Role.ADMIN,
      value: Role.ADMIN,
    },
  ];

  if (isAdd) record = null;

  useEffect(() => {
    if (isOpen) {
      const newPassword = generatePassword();
      setPassword(newPassword);
      form.setFieldsValue({ password: newPassword });
    }
  }, [form, isOpen, action]);

  const handleOk = () => {
    form
      .validateFields(fieldsToValidate)
      .then((values) => {
        setIsSubmitting(true);
        const updatedRecord = { ...record, ...values };
        action == "add" ? addUser(values) : updateUser(updatedRecord);
        setIsSubmitting(false);
        onCancel();
      })
      .then(() => {})
      .catch((error) => console.error("Validation error:", error));
  };

  return (
    <Modal
      open={isOpen}
      title={formTitle}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form form={form} className={styles.form} layout="vertical">
        <Item
          label="Name"
          name="name"
          rules={[{ ...requiredInputRules[0], message: "Please enter a name" }]}
          initialValue={record?.name}
        >
          <Input />
        </Item>
        <Item
          label="Email"
          name="email"
          rules={emailInputRules}
          initialValue={record?.email}
        >
          <Input />
        </Item>

        {isAdd && (
          <Item
            label="password"
            name="password"
            rules={[...requiredInputRules, ...passwordInputRules]}
            initialValue={password}
          >
            <Input />
          </Item>
        )}

        <Item
          label="Role"
          name="role"
          rules={requiredInputRules}
          initialValue={role}
        >
          <Select options={options} />
        </Item>

        <Item className={styles["form-button"]}>
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
