import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function AdminLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setAdmin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/admin/login",
        formData,
        { withCredentials: true }
      );
      toast.success(data.message || "Login successful");
      setAdmin(data.admin);
      setIsAuthenticated(true);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform hover:scale-[1.02] duration-300">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="mx-auto w-24 mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">
            Admin <span className="text-blue-600">Login</span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Secure access to your dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold transition-all duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Admin Panel — All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
