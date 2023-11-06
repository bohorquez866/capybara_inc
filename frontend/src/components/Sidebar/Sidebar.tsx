import { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Menu, Modal, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./sidebar.module.scss";
import fontsStyles from "@/styles/typography.module.scss";
import { createPortal } from "react-dom";

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { Title, Text } = Typography;
  const router = useRouter();

  const logout = async () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleOk = () => logout();
  const handleCancel = () => setIsModalOpen(false);
  const handleLogout = () => setIsModalOpen(true);

  const userData = {
    name: "Jesus",
    url: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    english: "C1",
    role: "user",
    team: "Arroyo",
  };

  return (
    <aside className={styles.aside}>
      {isModalOpen &&
        createPortal(
          <Modal
            title="Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Logout"
            cancelText="Cancel"
            okButtonProps={{
              danger: true,
            }}
          >
            Are you sure you want to log out?
          </Modal>,
          document.body
        )}

      <Row className={styles.sidebar}>
        <Col>
          <Title className={fontsStyles.title} level={3}>
            {userData.team}
          </Title>

          <Image
            className={styles.profileImage}
            width={100}
            height={100}
            src={userData.url}
            alt={userData.name}
          />
        </Col>

        <Col>
          <Title className={fontsStyles.title2} level={4}>
            {userData.name}
          </Title>
          <Text className={fontsStyles.subtitleText}>{userData.role}</Text>
        </Col>

        <Col>{/* <Menu items={<div></div>} /> */}</Col>

        <Col className={styles.logoutBtn}>
          <Button onClick={handleLogout} type="link">
            <LogoutOutlined onClick={logout} /> Logout
          </Button>
        </Col>
      </Row>
    </aside>
  );
}
