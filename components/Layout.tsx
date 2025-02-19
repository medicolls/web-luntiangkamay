"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { Layout as AntLayout, Avatar, Button, Typography, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Sider } = AntLayout;
const { Title } = Typography;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter(); // ✅ Initialize router

  const handleLogout = () => {
    // ✅ Clear authentication token (if stored in localStorage or sessionStorage)
    localStorage.removeItem("authToken"); 
    sessionStorage.removeItem("authToken");

    router.push("/");

    console.log("User logged out successfully");
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {/* Sidebar (Fixed & Non-Collapsible) */}
      <Sider
        width={250}
        style={{
          backgroundColor: "#003300",
          minHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar />
      </Sider>

      {/* Main Layout for Header & Content */}
      <AntLayout style={{ marginLeft: 250 }}>
        {/* Header */}
        <Header
          style={{
            backgroundColor: "#f5f5f5",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>Admin Panel</Title>

          <Space size="large">
            {/* Profile Link */}
            <Link href="/pages/profile" style={{ textDecoration: "none" }}>
              <Space>
                <Avatar size="large" icon={<UserOutlined />} />
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#333" }}>Profile</span>
              </Space>
            </Link>

            {/* Logout Button */}
            <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </Header>

        {/* Content Area */}
        <Content
          style={{
            padding: "24px",
            margin: "24px 16px",
            backgroundColor: "#fff",
            minHeight: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
