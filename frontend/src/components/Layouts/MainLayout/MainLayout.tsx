import Sidebar from "@/components/Sidebar/Sidebar";
import { Layout } from "antd";
import React from "react";
import { MainLayoutProps } from "./MainLayout.types";
import styles from "./MainLayout.module.scss";

export default function MainLayout({ children }: MainLayoutProps) {
  const { Content, Sider } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout hasSider className={styles.container}>
      <Sider
        className={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        trigger={
          <div className="trigger" onClick={() => onCollapse(!collapsed)}>
            <i className="anticon anticon-menu-unfold" />
          </div>
        }
      >
        <Sidebar />
      </Sider>

      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
