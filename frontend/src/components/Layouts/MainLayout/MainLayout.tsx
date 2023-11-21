import Sidebar from "@/components/Sidebar/Sidebar";
import { Layout } from "antd";
import React from "react";
import { MainLayoutProps } from "./MainLayout.types";
import styles from "./MainLayout.module.scss";
import MobileSidebar from "@/MobileSidebar";
import { useResponsive } from "@/hooks/useResponsive";

export default function MainLayout({ children }: MainLayoutProps) {
  const { Content, Sider } = Layout;
  const isMobile = useResponsive();

  return (
    <Layout hasSider className={styles.container}>
      <Sider className={styles.sider}>
        {isMobile ? <MobileSidebar /> : <Sidebar />}
      </Sider>

      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
