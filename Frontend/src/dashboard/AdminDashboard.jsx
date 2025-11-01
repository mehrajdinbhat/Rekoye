import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import AdminProducts from "./adminProducts.jsx"; // ✅ Import products component

function AdminDashboard() {
  const { setAdmin, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("products"); // ✅ default page

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4001/api/admin/logout", {
        withCredentials: true,
      });
      setAdmin(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // ✅ Sidebar button handler
  const handleNavigation = (page) => {
    setActivePage(page);
    if (page === "home") navigate("/");
    if (page === "queries") navigate("/queries");
    if (page === "create") navigate("/create");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 bg-gray-800 text-white w-64 h-screen p-6 flex flex-col transform transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

        <button
          onClick={() => handleNavigation("products")}
          className={`mb-3 py-2 px-4 rounded w-full ${
            activePage === "products"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          See Products
        </button>

        <button
          onClick={() => handleNavigation("queries")}
          className="mb-3 py-2 px-4 rounded bg-yellow-600 hover:bg-yellow-700 w-full"
        >
          See Messages
        </button>

        <button
          onClick={() => handleNavigation("create")}
          className="mb-3 py-2 px-4 rounded bg-green-600 hover:bg-green-700 w-full"
        >
          Create Product
        </button>

        <button
          onClick={() => handleNavigation("home")}
          className="mb-3 py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 w-full"
        >
          Home
        </button>

        <button
          onClick={handleLogout}
          className="py-2 px-4 rounded bg-red-600 hover:bg-red-700 w-full"
        >
          Logout
        </button>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-800 text-white p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? "✖" : "☰"}
      </button>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 md:ml-64 overflow-y-auto">
        {/* ✅ Render selected page */}
        {activePage === "products" && <AdminProducts />}
      </div>
    </div>
  );
}

export default AdminDashboard;
