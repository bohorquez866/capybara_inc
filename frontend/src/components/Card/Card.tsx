import React, { Children, ReactNode } from "react";
import { Card as AntdCard, CardProps } from "antd";

interface CardpProps {
  CardProps: CardProps;
  children: ReactNode;
}

export default function Card({ CardProps, children }: CardpProps) {
  return <AntdCard {...CardProps}>{children}</AntdCard>;
}
