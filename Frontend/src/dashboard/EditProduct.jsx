import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [oldImages, setOldImages] = useState([]); // existing images
  const [newImages, setNewImages] = useState([]); // new uploads

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/api/products/${id}`);
        setName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setPrice(data.price);
        setStock(data.stock);
        setOldImages(data.images || []);
      } catch (error) {
        toast.error("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle new images selection
  const handleNewImagesChange = (e) => {
    setNewImages([...e.target.files]);
  };

  // Remove an old image
  const removeOldImage = (index) => {
    const updatedImages = [...oldImages];
    updatedImages.splice(index, 1);
    setOldImages(updatedImages);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);

    // append remaining old images
    formData.append("oldImages", JSON.stringify(oldImages));

    // append new images
    newImages.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.put(
        `http://localhost:4001/api/products/update/${id}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Product updated successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to update product");
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Old Images Preview */}
        <div className="flex gap-2 flex-wrap">
          {oldImages.map((img, idx) => (
            <div key={idx} className="relative">
              <img src={img.url} alt="old" className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeOldImage(idx)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* New Images Upload */}
        <input type="file" multiple onChange={handleNewImagesChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
