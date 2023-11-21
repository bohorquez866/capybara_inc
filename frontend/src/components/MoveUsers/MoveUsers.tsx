import React, { useState } from "react";
import { Form, Input, Select, Button, DatePicker, DatePickerProps } from "antd";
import { accountRecords, accountUsers } from "../SuperuserView/data";
import { useLog } from "@/context/movementLog";
import { useData } from "@/context/data";
import { minDateInputRules, requiredInputRules } from "@/helpers/antdFormRules";
import { json } from "stream/consumers";
import moment, { Moment } from "moment";

export default function MoveUsers({ onCancel }: any) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addLog } = useLog();
  const { Option } = Select;
  const { accounts, users, updateAccount, updateUser } = useData();

  const fields = ["user", "newAccount", "startDate", "endDate", "oldAccount"];

  const validateDateIsNotPriorToToday: DatePickerProps["disabledDate"] = (
    current
  ) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  };

  const handleOk = () => {
    form
      .validateFields(fields)
      .then((values) => {
        const { user, newAccount, startDate, endDate } = values;
        const oldAccount = accountUsers.find((u) => u.email === user)?.team;
        console.log(oldAccount);

        setIsSubmitting(true);
        updateOriginalArray(user, newAccount);
        addLog({
          user,
          newAccount,
          oldAccount: oldAccount,
          startDate,
          endDate,
        });
        setIsSubmitting(false);
        onCancel();
        form.resetFields();
      })

      .catch((error) => console.error("Validation error:", error));
  };

  const updateOriginalArray = (user: { email: string }, newTeam: string) => {
    const clonedUsers = [...users];

    for (let i = 0; i < clonedUsers.length; i++) {
      if (clonedUsers[i].email === user.email) {
        clonedUsers[i].team = newTeam;
        break;
      }
    }
    accountUsers.splice(0, accountUsers.length);
    accountUsers.push(...clonedUsers);
  };

  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        label="User"
        name="user"
        rules={[{ required: true, message: "Please select a user" }]}
      >
        <Select>
          {users.map((u) => (
            <Option key={u.email}>{u.email}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="New Account"
        name="newAccount"
        rules={[{ required: true, message: "Please select a new account" }]}
      >
        <Select
          options={accountRecords.map((account) => ({
            value: account.accountName,
            label: account.accountName,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Start Date"
        name={"startDate"}
        rules={[...requiredInputRules, ...minDateInputRules]}
      >
        <DatePicker disabledDate={validateDateIsNotPriorToToday} />
      </Form.Item>

      <Form.Item
        label="End Date"
        name={"endDate"}
        rules={[{ required: true, message: "Please select an end date" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block onClick={handleOk} disabled={isSubmitting}>
          Move User
        </Button>
      </Form.Item>
    </Form>
  );
}
