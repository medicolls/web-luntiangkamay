"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { Layout as AntLayout, Avatar, Button, Typography, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header, Content } = AntLayout;
const { Title } = Typography;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <AntLayout>
        {/* Header */}
        <Header
          style={{
            backgroundColor: "#f5f5f5",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Admin Panel
          </Title>

          <Space size="large">
            {/* Profile Link */}
            <Link href="/pages/profile">
              <Space>
                <Avatar size="large" icon={<UserOutlined />} />
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  Profile
                </span>
              </Space>
            </Link>

            {/* Logout Button */}
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Space>
        </Header>

        {/* Content */}
        <Content style={{ padding: "24px", backgroundColor: "#fff" }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
