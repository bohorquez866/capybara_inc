import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

import { useData } from "@/context/data";
import CommonForm from "@/components/Form";
import {
  driveUrlInputRules,
  requiredInputRules,
} from "@/helpers/antdFormRules";
import { CommonFormProps } from "@/components/Form/form.types";
import { AccountFormProps } from "@/AccountModal/AccountForm.types";
import { UserFormProps } from "../UserForm/UserForm.types";
import { useAuth } from "@/context/auth";

export default function RegularUserModal({
  isOpen,
  onCancel,
  record,
  action,
  formTitle,
}: UserFormProps) {
  const { updateUser } = useAuth();
  const isAdd = action === "add";

  const fieldsToValidate: CommonFormProps["fields"] = [
    { name: "name", rules: [...requiredInputRules] },
    { name: "cv_url", rules: [...requiredInputRules, ...driveUrlInputRules] },
    { name: "english_level", rules: [...requiredInputRules] },
  ];

  const englishOptions: CommonFormProps["selectOptions"] = [
    {
      label: "C1",
      value: "C1",
    },
    {
      label: "C2",
      value: "C2",
    },
    {
      label: "B2",
      value: "B2",
    },
    {
      label: "B1",
      value: "B1",
    },
    {
      label: "A2",
      value: "A2",
    },
    {
      label: "A1",
      value: "A1",
    },
  ];

  console.log(record);

  if (isAdd) record = null;

  return (
    <CommonForm
      action={action}
      formTitle={formTitle}
      fields={fieldsToValidate}
      isOpen={isOpen}
      onCancel={onCancel}
      initialValues={record}
      record={record}
      selectOptions={englishOptions}
      onSubmit={{
        add: null,
        update: updateUser,
      }}
    />
  );
}
