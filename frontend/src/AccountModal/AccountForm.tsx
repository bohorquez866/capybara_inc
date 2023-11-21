import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

import { AccountFormProps } from "./AccountForm.types";
import { useData } from "@/context/data";
import CommonForm from "@/components/Form";
import { requiredInputRules } from "@/helpers/antdFormRules";
import { CommonFormProps } from "@/components/Form/form.types";

export default function UserModa({
  isOpen,
  onCancel,
  record,
  action,
  formTitle,
}: AccountFormProps) {
  const { updateAccount, addAccount } = useData();
  const isAdd = action === "add";

  const fieldsToValidate: CommonFormProps["fields"] = [
    { name: "accountName", rules: [...requiredInputRules] },
    { name: "clientName", rules: [...requiredInputRules] },
    { name: "operationLeader", rules: [...requiredInputRules] },
  ];

  if (isAdd) record = null;

  return (
    <CommonForm
      action={action}
      formTitle={formTitle}
      fields={fieldsToValidate}
      initialValues={fieldsToValidate}
      isOpen={isOpen}
      onCancel={onCancel}
      record={record}
      onSubmit={{
        add: addAccount,
        update: updateAccount,
      }}
    />
  );
}
