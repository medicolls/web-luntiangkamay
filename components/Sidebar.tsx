"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layout, Menu, Drawer, Button } from "antd";
import { FiMenu, FiHome, FiFileText, FiUsers } from "react-icons/fi";

const { Sider, Content } = Layout;

const Sidebar = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const sidebarMenuItems = [
    {
      key: "dashboard",
      icon: <FiHome size={18} />,
      label: <Link href="/pages/dashboard">Dashboard</Link>,
    },
    {
      key: "requests",
      icon: <FiFileText size={18} />,
      label: <Link href="/pages/requests">Requests</Link>,
    },
    {
      key: "users",
      icon: <FiUsers size={18} />,
      label: <Link href="/pages/users">Users</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Mobile Drawer Toggle */}
      <Button
        type="primary"
        onClick={toggleDrawer}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1000,
          display: "inline-block",
        }}
      >
        <FiMenu size={18} />
      </Button>

      {/* Drawer for Mobile */}
      <Drawer
        title="Luntiang Kamay"
        placement="left"
        onClose={toggleDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          theme="dark"
          mode="vertical"
          items={sidebarMenuItems}
          defaultSelectedKeys={["dashboard"]}
        />
      </Drawer>

      {/* Sidebar for Desktop */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#003300" }}
      >
        <div style={{ textAlign: "center", padding: "16px", color: "#ffffff" }}>
          <h2 style={{ margin: 0, fontSize: "18px" }}>Luntiang Kamay</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={sidebarMenuItems}
          defaultSelectedKeys={["dashboard"]}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "12px",
          }}
        >
          © 2024 Luntiang Kamay
        </div>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Content style={{ margin: "24px 16px", background: "#fff", padding: 24 }}>
          {/* Placeholder for dynamic content */}
          <h1>Welcome to the Dashboard</h1>
          <p>Manage your content here.</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
