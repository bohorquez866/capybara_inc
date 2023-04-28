import { Typography } from "antd";
const { Title } = Typography;
import RegisterForm from "../../components/RegisterForm/index";

const RegisterUserPage: React.FC = () => {
  return (
    <>
      <Title level={2}>Register User</Title>
      <RegisterForm />
    </>
  );
};

export default RegisterUserPage;
