"use client";
import { CSSProperties, useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, List, Menu, Modal, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./sidebar.module.scss";
import fontsStyles from "@/styles/typography.module.scss";
import { createPortal } from "react-dom";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { Role, useHasPermissionHook } from "@/hooks/useRoleAccess";

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState(false);

  const { Title, Text } = Typography;
  const { user, logout } = useAuth();
  const router = useRouter();
  const currentUrl = useRouter().pathname;
  const isUser = user?.role == Role.USER;

  const { Item } = List;

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const handleOk = () => {
    logout();
    router.push("/login");
  };
  const handleCancel = () => setIsModalOpen(false);
  const handleLogout = () => setIsModalOpen(true);

  interface Items {
    label: string;
    key: String;
    href: string;
  }

  const items: Items[] = [
    {
      label: "Users",
      key: "home",
      href: "/users",
    },
    {
      label: "Accounts",
      key: "accounts",
      href: "/accounts",
    },
    {
      label: "Logs",
      key: "logs",
      href: "/logs",
    },
  ];

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
            src={user?.image_url as string}
            alt={user?.name as string}
          />
        </Col>

        <Col>
          <Title className={fontsStyles.title2} level={4}>
            {user?.name}
          </Title>
          <Text className={fontsStyles.subtitleText}>{user?.role}</Text>
        </Col>

        {!isUser && (
          <Col>
            <List size="small" className={styles.list}>
              {items.map((item) => (
                <Item key={item.key as string} className={styles["item-antd"]}>
                  <Link
                    className={`${styles["item-link"]} ${
                      currentUrl === item.href && styles["is-active"]
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </Item>
              ))}
            </List>
          </Col>
        )}

        <Col className={styles.logoutBtn}>
          <Button onClick={handleLogout} type="link">
            <LogoutOutlined onClick={logout} /> Logout
          </Button>
        </Col>
      </Row>
    </aside>
  );
}
