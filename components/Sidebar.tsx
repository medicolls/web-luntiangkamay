"use client";

import React from "react";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { FiHome, FiFileText, FiUsers } from "react-icons/fi";

const { Sider } = Layout;

const Sidebar = () => {
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
    <Sider
      breakpoint="lg"
      collapsedWidth="80"
      style={{
        height: "100vh",
        backgroundColor: "#003300",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
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
  );
};

export default Sidebar;
