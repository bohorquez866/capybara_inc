import { CardProps, ModalProps, TableProps } from "antd";
import { Component, ReactNode } from "react";

export interface CrudTableProps {
  TableProps: TableProps;
  CardProps: CardProps;
  onClick?: () => void;
  buttonText?: string;
  children?: JSX.Element;
}
