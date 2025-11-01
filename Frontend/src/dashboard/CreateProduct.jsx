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

  const [previewImages, setPreviewImages] = useState([]); // 👈 for image previews

  const navigate = useNavigate();

  // ✅ Handle text & number changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle multiple image selection & show previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // generate preview URLs for display
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // ✅ Submit product form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (const key in formData) {
        if (key === "images") {
          for (const file of formData.images) {
            data.append("images", file);
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      await axios.post("http://localhost:4001/api/products/create", data, {
        withCredentials: true,
      });

      toast.success("✅ Product created successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("❌ Failed to create product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          🧾 Create Product
        </h2>

        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description (You can use markdown: **bold**, - points)"
          className="w-full mb-3 p-2 border rounded"
          rows="4"
          onChange={handleChange}
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Images Upload */}
        <label className="block mb-2 font-semibold text-gray-700">
          Upload Images
        </label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          className="w-full mb-3"
          onChange={handleImageChange}
        />

        {/* 👇 Image Previews */}
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {previewImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover rounded border"
                />
                {/* remove image option */}
                <button
                  type="button"
                  onClick={() => {
                    const newFiles = [...formData.images];
                    const newPreviews = [...previewImages];
                    newFiles.splice(index, 1);
                    newPreviews.splice(index, 1);
                    setFormData({ ...formData, images: newFiles });
                    setPreviewImages(newPreviews);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
