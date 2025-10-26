// src/dashboard/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4001/api/admin/products",
        {
          withCredentials: true,
        }
      );
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
      await axios.delete(
        `http://localhost:4001/api/products/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Update product (redirect to update form page)
  const handleUpdate = (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        All Products
      </h1>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition duration-300"
            >
              {product.images?.length > 0 && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                {product.category || "General Medicine"}
              </p>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {product.description || "No description available."}
              </p>
              <div className="flex justify-between items-center mb-3">
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

              <div className="flex gap-3">
                <button
                  onClick={() => handleUpdate(product._id)}
                  className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
