"use client";

import Layout from "@/components/Layout";
import { Typography, Card } from "antd";

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  return (
    <Layout>
      <Card
        bordered={false}
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ color: "#2f4f4f", marginBottom: "16px" }}>
          Dashboard
        </Title>
        <Paragraph style={{ fontSize: "16px", color: "#595959" }}>
          Welcome to the admin dashboard. Here, you can manage requests and
          users.
        </Paragraph>
      </Card>
    </Layout>
  );
};

export default Dashboard;
