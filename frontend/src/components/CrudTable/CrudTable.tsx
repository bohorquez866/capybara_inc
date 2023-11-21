import Card from "../Card/Card";
import { Button, Modal, Table, CardProps } from "antd";
import { CrudTableProps } from "./CrudTable.types";
import styles from "./CrudTable.module.scss";

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
        <Button className={styles.button} onClick={onClick}>
          {buttonText}
        </Button>
      )}
      {children}
      <Table
        {...TableProps}
        scroll={{ x: "calc(700px + 50%)", y: 240 }}
        size="middle"
      />
    </Card>
  );
}
