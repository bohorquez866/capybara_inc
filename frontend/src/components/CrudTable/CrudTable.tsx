import Card from "../Card/Card";
import { Button, Modal, Table, CardProps } from "antd";
import { CrudTableProps } from "./CrudTable.types";

export default function CrudTable({
  TableProps,
  CardProps,
  onClick,
  buttonText,
  children,
}: CrudTableProps) {
  return (
    <Card CardProps={{ ...CardProps, size: "small" }}>
      {buttonText && (
        <Button style={{ marginBottom: "40px" }} onClick={onClick}>
          {buttonText}
        </Button>
      )}
      {children}
      <Table {...TableProps} size="middle" />
    </Card>
  );
}
