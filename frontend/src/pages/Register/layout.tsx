import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import RegisterUserPage from '../../components/RegisterForm/RegisterForm';


const RegisterLayout: React.FC = () => {
const { Content } = Layout;

return (
    <>
      <Head>
        <title>Register User</title>
      </Head>
      <Layout>
        <Content style={{ padding: '50px' }}>
          <RegisterUserPage />
        </Content>
      </Layout>
    </>
  );
};

export default RegisterLayout;
