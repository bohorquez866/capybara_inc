"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Layout, Typography } from "antd";
import styles from "./login.module.scss";

const LoginLayout = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.form}>
          <Title className={styles.title} level={2}>
            Log in
          </Title>
          <LoginForm />
        </div>
      </Content>
    </Layout>
  );
};

export default LoginLayout;
