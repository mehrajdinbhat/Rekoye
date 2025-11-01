import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";


function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // 🔹 New state for main image

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4001/api/products/${id}`
      );
      setProduct(data);
      if (data.images && data.images.length > 0) {
        setSelectedImage(data.images[0].url); // 🔹 Default to first image
      }
    } catch (error) {
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg mb-4">Product not found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row gap-6 p-6">
        {/* Left Side - Product Images */}
        <div className="md:w-1/2 flex flex-col items-center">
          {/* Main Image */}
          <div className="w-full h-96 overflow-hidden rounded-lg border border-gray-200 mb-4">
            <img
              src={
                selectedImage ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex flex-wrap justify-center gap-3">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-20 w-20 object-cover rounded-lg border-2 cursor-pointer transition ${
                    selectedImage === img.url
                      ? "border-blue-600 scale-105"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                  onClick={() => setSelectedImage(img.url)} // 🔹 Change main image
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No additional images.</p>
            )}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 mb-3">{product.category}</p>
            {/* <p className="text-gray-700 mb-4">{product.description}</p> */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-xl font-semibold mt-4 mb-2"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-inside space-y-1"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-700 leading-relaxed" {...props} />
                  ),
                }}
              >
                {product.description}
              </ReactMarkdown>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-600 font-bold text-2xl">
                ₹{product.price}
              </span>
              <span
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
