import CrudTable from "@/components/CrudTable/CrudTable";
import MainLayout from "@/components/Layouts/MainLayout";
import { MovementLog } from "@/context/context.types";
import { useLog } from "@/context/movementLog";
import moment from "moment";
import React from "react";

export default function Logs() {
  const { logs } = useLog();
  const dateFormat = "MM-DD-YYYY";

  const logColumns = [
    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      render: (user: MovementLog) => user,
    },
    {
      title: "New Account",
      dataIndex: "newAccount",
      key: "newAccount",
    },
    {
      title: "Previous Account",
      dataIndex: "oldAccount",
      key: "oldAccount",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: Date) => moment(startDate).format(dateFormat),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Date) => moment(endDate).format(dateFormat),
    },
  ];

  return (
    <MainLayout>
      <CrudTable
        CardProps={{ title: "Logs" }}
        TableProps={{
          columns: logColumns,
          dataSource: logs,
        }}
      />
    </MainLayout>
  );
}
