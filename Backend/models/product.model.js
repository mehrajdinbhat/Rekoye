import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
