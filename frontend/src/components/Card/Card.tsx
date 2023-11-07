import React, { Children, ReactNode } from "react";
import { Card as AntdCard, CardProps } from "antd";
import styles from "./Card.module.scss";

interface CardpProps {
  CardProps?: CardProps;
  children: ReactNode;
}

export default function Card({ CardProps, children }: CardpProps) {
  return (
    <AntdCard className={styles.card} {...CardProps}>
      {children}
    </AntdCard>
  );
}
