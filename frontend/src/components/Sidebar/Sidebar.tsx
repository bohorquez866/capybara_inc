import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Menu, Row, Typography } from "antd";
import Image from "next/image";
import React from "react";
import { sidebarContent, sidebarStyles } from "./Sidebar.styles";
import { useRouter } from "next/router";

export default function Sidebar() {
  const { Title, Text } = Typography;
  const router = useRouter();
  const logout = async () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  const userData = {
    name: "Jesus",
    url: "",
    english: "C1",
    role: "user",
    team: "Arroyo",
  };

  return (
    <aside style={sidebarStyles}>
      <Row style={sidebarContent}>
        <Col>
          <Title level={3}>{userData.team}</Title>
          <Image src={userData.url} alt={userData.name} />
        </Col>

        <Col>
          <Title level={4}>{userData.name}</Title>
          <Text>{userData.role}</Text>
        </Col>

        <Col>
          <Menu></Menu>
        </Col>

        <Col>
          <Button type="link">
            <LogoutOutlined onClick={logout} /> Logout
          </Button>
        </Col>
      </Row>
    </aside>
  );
}
