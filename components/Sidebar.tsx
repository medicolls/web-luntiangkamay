"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiHome, FiFileText, FiUsers} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-green-700 text-white p-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static h-full bg-green-900 text-gray-200 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 flex flex-col shadow-xl`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center p-6 border-b border-green-700">
          <h2 className="text-xl font-bold text-center tracking-wide">
            Luntiang Kamay
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-grow">
          <ul className="space-y-4 mt-6 px-4">
            <li>
              <Link
                href="/pages/dashboard"
                className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-green-800 hover:text-white transition"
              >
                <FiHome size={20} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pages/requests"
                className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-green-800 hover:text-white transition"
              >
                <FiFileText size={20} />
                <span className="text-sm font-medium">Requests</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pages/users"
                className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-green-800 hover:text-white transition"
              >
                <FiUsers size={20} />
                <span className="text-sm font-medium">Users</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-green-700 text-center text-sm text-gray-400">
          <p>© 2024 Luntiang Kamay</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Content */}
        <main className="flex-grow p-6 bg-gray-50">
          {/* Placeholder for dynamic content */}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
