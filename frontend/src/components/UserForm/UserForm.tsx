import { useState } from "react";
import { Form, SelectProps } from "antd";
import { UserFormProps } from "./UserForm.types";
import { useData } from "@/context/data";
import { Role, useHasPermissionHook } from "@/hooks/useRoleAccess";
import {
  emailInputRules,
  passwordInputRules,
  requiredInputRules,
} from "@/helpers/antdFormRules";
import CommonForm from "../Form/Form";
import { CommonFormProps } from "../Form/form.types";

export default function UserModal({
  isOpen,
  onCancel,
  record,
  action,
  formTitle,
}: UserFormProps) {
  const { updateUser, addUser } = useData();
  const isAdd = action === "add";

  const fieldsToValidate: CommonFormProps["fields"] = [
    { name: "name", rules: [...requiredInputRules] },
    { name: "email", rules: [...emailInputRules, ...requiredInputRules] },
    { name: "role", rules: [...requiredInputRules] },
  ];

  if (isAdd) {
    fieldsToValidate.push({
      name: "password",
      rules: [...requiredInputRules, ...passwordInputRules],
    });
  }

  console.log(record);
  const isSuperUser = useHasPermissionHook(Role.SUPERUSER);

  const options = [
    {
      label: Role.USER,
      value: Role.USER,
    },
  ];

  isSuperUser &&
    options.push({
      label: Role.ADMIN,
      value: Role.ADMIN,
    });

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
      selectOptions={options}
      onSubmit={{
        add: addUser,
        update: updateUser,
      }}
    />
  );
}
