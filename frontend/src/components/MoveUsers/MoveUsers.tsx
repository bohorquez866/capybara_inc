import React, { useState } from "react";
import { Form, Input, Select, Button, DatePicker } from "antd";
import { accountRecords, accountUsers } from "../SuperuserView/data";
import { useLog } from "@/context/movementLog";
import { useUser } from "@/context/Users";

export default function MoveUsers({ onCancel }) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addLog } = useLog();
  const { Option } = Select;

  const handleOk = () => {
    form
      .validateFields([
        "user",
        "newAccount",
        "startDate",
        "endDate",
        "oldAccount",
      ])
      .then((values) => {
        const { user, newAccount, startDate, endDate } = values;
        const oldAccount = accountUsers.find((u) => u.email === user)?.team;
        console.log(oldAccount);

        setIsSubmitting(true);
        updateOriginalArray(user, newAccount);
        addLog({
          user,
          newAccount,
          oldAccount: oldAccount as string,
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
    const clonedUsers = [...accountUsers];
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
          {accountUsers.map((u) => (
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
        rules={[{ required: true, message: "Please select a start date" }]}
      >
        <DatePicker />
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
