"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import DataTable from "react-data-table-component";

interface SeedRequest {
  _id: string;
  userId: string; // Keep userId if still necessary
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
  const [selectedRequest, setSelectedRequest] = useState<SeedRequest | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/seedrequests");
        if (!response.ok) {
          throw new Error("Failed to fetch seed requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching seed requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/seedrequests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!response.ok) {
        throw new Error("Failed to update request status");
      }
      const updatedRequest = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: updatedRequest.status } : request
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = (id: string) => {
    setSelectedRequest(requests.find((req) => req._id === id) || null);
    setShowRejectModal(true);
  };

  const submitRejectReason = async () => {
    if (!selectedRequest) return;

    try {
      const response = await fetch(`/api/seedrequests/${selectedRequest._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected", reason: rejectReason }),
      });
      if (!response.ok) {
        throw new Error("Failed to update request status");
      }
      const updatedRequest = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === selectedRequest._id
            ? { ...request, status: updatedRequest.status }
            : request
        )
      );
      setShowRejectModal(false);
      setRejectReason("");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleRelease = async (id: string) => {
    try {
      const response = await fetch(`/api/seedrequests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "released" }),
      });
      if (!response.ok) {
        throw new Error("Failed to update request status");
      }
      const updatedRequest = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: updatedRequest.status } : request
        )
      );
    } catch (error) {
      console.error("Error releasing request:", error);
    }
  };

  const handleView = (request: SeedRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectReason("");
  };

  const columns = [
    {
      name: "Seed Type",
      selector: (row: SeedRequest) => row.seedType,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: SeedRequest) => row.description,
    },
    {
      name: "Status",
      selector: (row: SeedRequest) => row.status,
      cell: (row: SeedRequest) => (
        <span
          className={`font-semibold ${
            row.status === "approved"
              ? "text-green-600"
              : row.status === "rejected"
              ? "text-red-600"
              : row.status === "released"
              ? "text-blue-600"
              : "text-yellow-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Created At",
      selector: (row: SeedRequest) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: "Actions",
      cell: (row: SeedRequest) => (
        <div className="space-x-2">
          {row.status === "approved" ? (
            <button
              onClick={() => handleRelease(row._id)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Release
            </button>
          ) : row.status === "released" ? (
            <button
              disabled
              className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
            >
              Released
            </button>
          ) : row.status === "rejected" ? (
            <button
              onClick={() => handleView(row)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              View
            </button>
          ) : (
            <>
              <button
                onClick={() => handleApprove(row._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(row._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Requests</h1>
      <p className="text-gray-600 mb-6">
        Manage all user requests from this page.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading requests...</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <DataTable
            columns={columns}
            data={requests}
            pagination
            highlightOnHover
          />
        </div>
      )}

      {/* Modal */}
      {showModal && selectedRequest && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Request Details
            </h2>
            <table className="w-full border-collapse border border-gray-200">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Seed Type</td>
                  <td className="border px-4 py-2">{selectedRequest.seedType}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Description</td>
                  <td className="border px-4 py-2">{selectedRequest.description}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Status</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`font-semibold ${
                        selectedRequest.status === "approved"
                          ? "text-green-600"
                          : selectedRequest.status === "rejected"
                          ? "text-red-600"
                          : selectedRequest.status === "released"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {selectedRequest.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Created At</td>
                  <td className="border px-4 py-2">
                    {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">User Details</td>
                  <td className="border px-4 py-2">
                    {selectedRequest.user ? (
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="font-semibold">Username:</td>
                            <td>{selectedRequest.user.username}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Email:</td>
                            <td>{selectedRequest.user.email}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Role:</td>
                            <td>{selectedRequest.user.role}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <p>No User Details Found</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Image</td>
                  <td className="border px-4 py-2">
                    {selectedRequest.imagePath ? (
                      <img
                        src={selectedRequest.imagePath}
                        alt={selectedRequest.seedType}
                        className="w-32 h-32 object-cover rounded"
                      />
                    ) : (
                      <p>No Image</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeRejectModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Reject Reason
            </h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter the reason for rejection"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={submitRejectReason}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Submit
              </button>
              <button
                onClick={closeRejectModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Requests;
