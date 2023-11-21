import React, { useState } from "react";
import { Menu, Drawer } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const MobileMenu = () => {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button type="button" onClick={toggleDrawer}>
        <MenuUnfoldOutlined style={{ width: "40px" }} />
      </button>
      <Drawer
        title="Menu"
        placement="left"
        open={visible}
        onClose={toggleDrawer}
      >
        <Menu mode="inline">
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Users</Menu.Item>
          <Menu.Item key="3">Products</Menu.Item>
          <Menu.Item key="4">Orders</Menu.Item>
          <Menu.Item key="5">Settings</Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default MobileMenu;
