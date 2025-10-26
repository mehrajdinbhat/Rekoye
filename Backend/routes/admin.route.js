import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
} from "../controllers/admin.controller.js";
import { isAdminAuthenticated } from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/register", registerAdmin); // only first time
router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);
router.get("/profile", isAdminAuthenticated, getAdminProfile);

export default router;

