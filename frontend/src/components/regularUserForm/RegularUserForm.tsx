import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

import CommonForm from "@/components/Form";
import {
  driveUrlInputRules,
  requiredInputRules,
} from "@/helpers/antdFormRules";
import { CommonFormProps } from "@/components/Form/form.types";
import { UserFormProps } from "../UserForm/UserForm.types";
import { useAuth } from "@/context/auth";
import { editUserInfo } from "@/helpers/login";

export default function RegularUserModal({
  isOpen,
  onCancel,
  record,
  action,
  formTitle,
  setUpdate,
  update,
}: UserFormProps) {
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

  if (isAdd) record = null;

  const id = localStorage.getItem("user") as string;
  const token = localStorage.getItem("token");
  const parsedToken = JSON.parse(token as string);

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
        update: (data: any) => {
          editUserInfo(id, parsedToken?.token, data);
          update && setUpdate(update + 1);
        },
      }}
    />
  );
}
