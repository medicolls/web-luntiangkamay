"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu } from "antd";
import { FiHome, FiFileText, FiUsers } from "react-icons/fi";
import Image from "next/image";

const { Sider } = Layout;

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  const sidebarMenuItems = [
    {
      key: "/pages/dashboard",
      icon: <FiHome size={20} />,
      label: <Link href="/pages/dashboard">Dashboard</Link>,
    },
    {
      key: "/pages/requests",
      icon: <FiFileText size={20} />,
      label: <Link href="/pages/requests">Requests</Link>,
    },
    {
      key: "/pages/users",
      icon: <FiUsers size={20} />,
      label: <Link href="/pages/users">Users</Link>,
    },
  ];

  return (
    <Sider
      width={250} // Fixed width, non-collapsible
      style={{
        height: "100vh",
        backgroundColor: "#004d1a", // Dark green background
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)",
        overflowY: "auto", // Ensure scrollability if needed
      }}
    >
      {/* Sidebar Header with Logo */}
      <div
        style={{
          textAlign: "center",
          padding: "16px",
          color: "#ffffff",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Image src="/logo.png" alt="Luntiang Kamay Logo" width={50} height={50} />
        <h2 style={{ margin: "10px 0 0 0", fontSize: "16px" }}>Luntiang Kamay</h2>
      </div>

      {/* Sidebar Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]} // Dynamically highlight the active page
        items={sidebarMenuItems}
        style={{
          backgroundColor: "transparent",
          fontSize: "16px",
          fontWeight: "500",
        }}
      />

      {/* Sidebar Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "12px",
          borderTop: "1px solid rgba(255, 255, 255, 0.3)",
          paddingTop: "10px",
        }}
      >
        © 2024 Luntiang Kamay
      </div>
    </Sider>
  );
};

export default Sidebar;
