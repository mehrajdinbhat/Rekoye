import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/api/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:4001/api/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
        🛍️ Admin Product Management
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Product Image (Square Shape) */}
              <div className="aspect-square w-full overflow-hidden relative">
                <img
                  src={
                    product.images?.[0]?.url ||
                    "https://via.placeholder.com/300x300?text=Medicine"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {product.category || "General Medicine"}
                </p>

                <div className="text-gray-700 text-sm mb-3 line-clamp-3 prose prose-sm">
                  <ReactMarkdown>{product.description}</ReactMarkdown>
                </div>

                {/* Price and Stock */}
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

                {/* Admin Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/product/update/${product._id}`)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
