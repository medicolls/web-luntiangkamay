"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, message, Typography, Space } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import Layout from "@/components/Layout";

const { Title } = Typography;

interface UserProfile {
  username: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [changingPassword, setChangingPassword] = useState(false);
  const router = useRouter();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Failed to load profile");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        message.error("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle password change
  // Handle password change with improved error handling
const handlePasswordChange = async (values: { currentPassword: string; newPassword: string }) => {
    setChangingPassword(true);
  
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Password update failed");
      }
  
      message.success("Password changed successfully!");
    } catch (error) {
      // ✅ Ensure error is properly handled
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setChangingPassword(false);
    }
  };  

  return (
    <Layout>
      <div className="p-6 flex justify-center">
        <Card style={{ width: 400, padding: "20px" }} loading={loading}>
          <Title level={3} className="text-center">Profile</Title>

          {user && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <p><UserOutlined /> <strong>Username:</strong> {user.username}</p>
              <p><MailOutlined /> <strong>Email:</strong> {user.email}</p>
            </Space>
          )}

          {/* Password Change Form */}
          <Title level={4} className="mt-4">Change Password</Title>
          <Form layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[{ required: true, message: "Please enter your current password" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter current password" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter new password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={changingPassword}>
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
