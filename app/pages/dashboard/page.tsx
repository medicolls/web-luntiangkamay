"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Typography, Card, Row, Col, Statistic, Spin } from "antd";
import { FiUsers, FiFileText, FiCheckCircle, FiClock, FiTag } from "react-icons/fi";

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const [data, setData] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    releasedRequests: 0, // ✅ New: Released requests count
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsRes, usersRes] = await Promise.all([
          fetch("/api/seedrequests"),
          fetch("/api/users"),
        ]);

        const requestsData = await requestsRes.json();
        const usersData = await usersRes.json();

        // ✅ Calculate stats
        const totalRequests = requestsData.length;
        const pendingRequests = requestsData.filter((r: any) => r.status === "pending").length;
        const approvedRequests = requestsData.filter((r: any) => r.status === "approved").length;
        const releasedRequests = requestsData.filter((r: any) => r.status === "released").length; // ✅ New
        const totalUsers = usersData.length;

        setData({
          totalRequests,
          pendingRequests,
          approvedRequests,
          releasedRequests, // ✅ New
          totalUsers,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>

      {/* Loading Indicator */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* Total Requests */}
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
              <Statistic
                title="Total Requests"
                value={data.totalRequests}
                prefix={<FiFileText style={{ color: "#1890ff" }} />}
              />
            </Card>
          </Col>

          {/* Pending Requests */}
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} style={{ backgroundColor: "#fffbe6" }}>
              <Statistic
                title="Pending Requests"
                value={data.pendingRequests}
                prefix={<FiClock style={{ color: "#faad14" }} />}
              />
            </Card>
          </Col>

          {/* Approved Requests */}
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} style={{ backgroundColor: "#f6ffed" }}>
              <Statistic
                title="Approved Requests"
                value={data.approvedRequests}
                prefix={<FiCheckCircle style={{ color: "#52c41a" }} />}
              />
            </Card>
          </Col>

          {/* Released Requests - ✅ New */}
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} style={{ backgroundColor: "#f0f5ff" }}>
              <Statistic
                title="Released Requests"
                value={data.releasedRequests}
                prefix={<FiTag style={{ color: "#722ed1" }} />}
              />
            </Card>
          </Col>

          {/* Total Users */}
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} style={{ backgroundColor: "#fff2e8" }}>
              <Statistic
                title="Total Users"
                value={data.totalUsers}
                prefix={<FiUsers style={{ color: "#fa541c" }} />}
              />
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Dashboard;
