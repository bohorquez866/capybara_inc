import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { generatePassword } from "@/helpers/generatePassword";
import styles from "./Form.module.scss";
import { CommonFormProps } from "./form.types";

export default function CommonForm({
  isOpen,
  action,
  fields,
  formTitle,
  onCancel,
  onSubmit,
  record,
  selectOptions,
}: CommonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { Item } = Form;

  const fieldNames = fields.map((field) => field.name);

  const handleOk = () => {
    form
      .validateFields(fieldNames)
      .then((values) => {
        setIsSubmitting(true);
        const updatedRecord = { ...record, ...values };
        action === "add"
          ? onSubmit.add(updatedRecord)
          : onSubmit.update(updatedRecord);
        setIsSubmitting(false);
        onCancel();
      })
      .catch((error) => console.error("Validation error:", error));
  };

  useEffect(() => {
    if (isOpen && action === "add") {
      const newPassword = generatePassword();
      form.setFieldsValue({ password: newPassword });
    }
  }, [form, isOpen, action]);

  return (
    <Modal
      open={isOpen}
      title={formTitle}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form form={form} className={styles.form} layout="vertical">
        {fields.map((field) => (
          <Item
            key={field.name}
            label={field.name === "password" ? "Password" : field.name}
            name={field.name}
            rules={[...field.rules]}
            initialValue={record[field.name]}
          >
            {field.name == "role" || field.name == "english_level" ? (
              <Select options={selectOptions} />
            ) : (
              <Input type="text" />
            )}
          </Item>
        ))}
        <Item className={styles["form-button"]}>
          <Button
            type="primary"
            block
            onClick={handleOk}
            disabled={isSubmitting}
          >
            {action === "add" ? "Add" : "Save"}
          </Button>
        </Item>
      </Form>
    </Modal>
  );
}
