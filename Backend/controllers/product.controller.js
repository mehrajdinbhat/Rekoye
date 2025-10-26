import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock } = req.body;

    if (!name || !price)
      return res.status(400).json({ message: "Name & price required" });

    let images = [];
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });
        images.push({ public_id: result.public_id, url: result.secure_url });
      }
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      images,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files && req.files.images) {
      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      let newImages = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });
        newImages.push({ public_id: result.public_id, url: result.secure_url });
      }
      req.body.images = newImages;
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Product updated successfully", updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
