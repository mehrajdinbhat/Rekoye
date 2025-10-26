import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/product.controller.js";
import { isAdminAuthenticated } from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createProduct);
router.get("/",getAllProducts);
router.put("/update/:id", isAdminAuthenticated, updateProduct);
router.delete("/delete/:id", isAdminAuthenticated, deleteProduct);
router.get("/:id", getProductById);

export default router;
