// src/pages/CreateProduct.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "images") {
          for (const file of formData.images) data.append("images", file);
        } else {
          data.append(key, formData[key]);
        }
      }

      await axios.post(
        "http://localhost:4001/api/products/create",
        data,
        {
          withCredentials: true,
        }
      );
      toast.success("Product created successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          className="w-full mb-3"
          onChange={handleImageChange}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
