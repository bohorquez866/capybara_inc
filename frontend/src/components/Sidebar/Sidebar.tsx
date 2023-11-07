"use client";
import { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Menu, Modal, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./sidebar.module.scss";
import fontsStyles from "@/styles/typography.module.scss";
import { createPortal } from "react-dom";
import { useAuth } from "@/context/auth";

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { Title, Text } = Typography;
  const { user, logout } = useAuth();
  const router = useRouter();
  console.log(user);

  const handleOk = () => {
    logout();
    router.push("/login");
  };
  const handleCancel = () => setIsModalOpen(false);
  const handleLogout = () => setIsModalOpen(true);

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
            {user?.team}
          </Title>

          <Image
            className={styles.profileImage}
            width={100}
            height={100}
            src={user?.cv_url as string}
            alt={user?.name as string}
          />
        </Col>

        <Col>
          <Title className={fontsStyles.title2} level={4}>
            {user?.name}
          </Title>
          <Text className={fontsStyles.subtitleText}>{user?.role}</Text>
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
