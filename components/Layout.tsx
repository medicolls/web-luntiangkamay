"use client";

import React from "react";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-gray-100 border-b border-gray-300 p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex space-x-4 items-center">
            <a
              href="/pages/profile"
              className="flex items-center space-x-1 text-gray-800 hover:text-green-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15a6 6 0 11-7.5 0"
                />
              </svg>
              <span className="text-sm font-medium">Profile</span>
            </a>
            <button
              onClick={() => console.log("User logged out")}
              className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25V19.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15"
                />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
