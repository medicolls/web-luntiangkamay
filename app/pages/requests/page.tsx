"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Table, Button, Tag, Modal, Input, Spin, message } from "antd";
import type { ColumnsType } from "antd/es/table";

interface SeedRequest {
  _id: string;
  user?: {
    username: string;
    email: string;
    role: string;
  };
  seedType: string;
  description: string;
  imagePath: string | null;
  status: string;
  createdAt: string;
}

const Requests = () => {
  const [requests, setRequests] = useState<SeedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<SeedRequest | null>(null);
  const [modalType, setModalType] = useState<"view" | "reject" | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch Requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/seedrequests");
        if (!response.ok) throw new Error("Failed to fetch requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching seed requests:", error);
        message.error("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Update Request Status
  const updateRequestStatus = async (id: string, status: string, reason?: string) => {
    try {
      const response = await fetch(`/api/seedrequests/${id}`, {
        method: "PUT", // ✅ Changed PATCH to PUT to match Next.js route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reason ? { status, reason } : { status }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to update request status");
      }

      const updatedRequest = await response.json();

      setRequests((prev) =>
        prev.map((req) => (req._id === id ? updatedRequest : req))
      );

      message.success(`Request marked as ${status}`);
      closeModal();
    } catch (error) {
      console.error(`Error updating request (${status}):`, error);
      message.error("Failed to update request.");
    }
  };

  // Open Modals
  const handleView = (request: SeedRequest) => {
    setSelectedRequest(request);
    setModalType("view");
  };

  const handleReject = (request: SeedRequest) => {
    setSelectedRequest(request);
    setModalType("reject");
  };

  // Close Modals
  const closeModal = () => {
    setModalType(null);
    setSelectedRequest(null);
    setRejectReason("");
  };

  // Table Columns
  const columns: ColumnsType<SeedRequest> = [
    {
      title: "Seed Type",
      dataIndex: "seedType",
      key: "seedType",
      sorter: (a, b) => a.seedType.localeCompare(b.seedType),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "approved" ? "green" : status === "rejected" ? "red" : status === "released" ? "blue" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          {record.status === "approved" ? (
            <Button type="primary" onClick={() => updateRequestStatus(record._id, "released")}>
              Release
            </Button>
          ) : record.status === "released" ? (
            <Button disabled>Released</Button>
          ) : record.status === "rejected" ? (
            <Button onClick={() => handleView(record)}>View</Button>
          ) : (
            <>
              <Button type="primary" onClick={() => updateRequestStatus(record._id, "approved")}>
                Approve
              </Button>
              <Button danger onClick={() => handleReject(record)}>
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Requests</h1>
          <p className="text-gray-600 mb-6">Manage all user requests from this page.</p>

          {loading ? (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <Table columns={columns} dataSource={requests} rowKey="_id" pagination={{ pageSize: 10 }} />
          )}
        </div>
      </div>

      {/* View Modal */}
      <Modal title="Request Details" open={modalType === "view"} onCancel={closeModal} footer={null}>
        {selectedRequest && (
          <>
            <p><strong>Seed Type:</strong> {selectedRequest.seedType}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
            <p><strong>User:</strong> {selectedRequest.user?.username || "Unknown"}</p>
          </>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        title="Reject Request"
        open={modalType === "reject"}
        onCancel={closeModal}
        onOk={() => updateRequestStatus(selectedRequest?._id || "", "rejected", rejectReason)}
        okButtonProps={{ disabled: !rejectReason.trim() }}
        okText="Submit"
        cancelText="Cancel"
      >
        <p>Enter a reason for rejection:</p>
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Enter rejection reason"
        />
      </Modal>
    </Layout>
  );
};

export default Requests;
