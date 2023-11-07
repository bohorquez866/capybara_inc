import Sidebar from "@/components/Sidebar/Sidebar";
import { Layout } from "antd";
import React from "react";
import { MainLayoutProps } from "./MainLayout.types";
import styles from "./MainLayout.module.scss";

export default function MainLayout({ children }: MainLayoutProps) {
  const { Content, Sider } = Layout;

  return (
    <Layout hasSider className={styles.container}>
      <Sider className={styles.sider} trigger={<>close</>}>
        <Sidebar />
      </Sider>

      <Content>{children}</Content>
    </Layout>
  );
}
