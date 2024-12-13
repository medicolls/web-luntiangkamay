"use client";

import Layout from "@/components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mt-4">
        Welcome to the admin dashboard. Here, you can manage requests and users.
      </p>
    </Layout>
  );
};

export default Dashboard;
