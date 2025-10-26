import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function AdminDashboard() {
  const { setAdmin, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:4001/api/products", {
        withCredentials: true,
      });
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:4001/api/products/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Logout
  const handleLogout = async () => {
    await axios.get("http://localhost:4001/api/admin/logout", {
      withCredentials: true,
    });
    setAdmin(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    navigate("/login");
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
          onClick={fetchProducts}
          className="mb-3 py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 w-full"
        >
          See Products
        </button>
        <button
          onClick={() => navigate("/queries")}
          className="mb-3 py-2 px-4 rounded bg-yellow-600 hover:bg-yellow-700 w-full"
        >
          See Messages
        </button>
        <button
          onClick={() => navigate("/create")}
          className="mb-3 py-2 px-4 rounded bg-green-600 hover:bg-green-700 w-full"
        >
          Create Product
        </button>
        <button
          onClick={handleLogout}
          className="py-2 px-4 rounded bg-red-600 hover:bg-red-700 w-full"
        >
          Logout
        </button>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-800 text-white p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? "✖" : "☰"}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 md:ml-64 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          All Products
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <div className="h-48 w-full overflow-hidden rounded-lg mb-3">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mb-1">
                  {product.category || "General"}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description || "No description available."}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-blue-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/product/update/${product._id}`)}
                    className="flex-1 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
