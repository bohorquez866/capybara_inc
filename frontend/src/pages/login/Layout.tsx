"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Layout, Typography } from "antd";
import { CenteredTitle } from "./styles";
import { formStyles, titleStyles } from "./LoginForm.styles";

const LoginLayout = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 50px",
        }}
      >
        <div style={formStyles}>
          <CenteredTitle style={titleStyles} level={2}>
            Log in
          </CenteredTitle>
          <LoginForm />
        </div>
      </Content>
    </Layout>
  );
};

export default LoginLayout;
