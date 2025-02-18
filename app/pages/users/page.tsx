"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Modal, Button, Typography, Card, Tag, Descriptions } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined, MailOutlined, SafetyOutlined, BranchesOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  plantsInProgress?: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users?role=user");
        const data: User[] = await response.json();
        setUsers(data);

        // ✅ Auto-open modal if a user has plants in progress
        const userWithPlants = data.find((user) => user.plantsInProgress && user.plantsInProgress > 0);
        if (userWithPlants) {
          setSelectedUser(userWithPlants);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Table Columns
  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Plants In Progress",
      dataIndex: "plantsInProgress",
      key: "plantsInProgress",
      render: (plants: number) =>
        plants > 0 ? (
          <Tag color="green">
            <BranchesOutlined /> {plants} Active
          </Tag>
        ) : (
          <Tag color="red">None</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => openModal(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        <Card bordered={false} className="shadow-md">
          <Title level={2} className="text-gray-800">User Management</Title>
          <Text type="secondary">Manage all registered user accounts from this page.</Text>

          {/* Users Table */}
          <div className="mt-6">
            <Table columns={columns} dataSource={users} rowKey="_id" pagination={{ pageSize: 8 }} />
          </div>
        </Card>
      </div>

      {/* User Details Modal */}
      <Modal
        title={<Title level={4}>👤 User Details</Title>}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="close" type="primary" onClick={closeModal}>
            Close
          </Button>,
        ]}
        centered
        width={500} // ✅ Sets a better modal width
      >
        {selectedUser && (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Name">
              <UserOutlined style={{ marginRight: 8 }} />
              {selectedUser.name}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              <MailOutlined style={{ marginRight: 8 }} />
              {selectedUser.email}
            </Descriptions.Item>

            <Descriptions.Item label="Role">
              <SafetyOutlined style={{ marginRight: 8 }} />
              <Tag color="blue">{selectedUser.role}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Plants In Progress">
              {selectedUser.plantsInProgress && selectedUser.plantsInProgress > 0 ? (
                <Tag color="green">
                  <BranchesOutlined /> {selectedUser.plantsInProgress} Active
                </Tag>
              ) : (
                <Tag color="red">None</Tag>
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Layout>
  );
};

export default Users;
