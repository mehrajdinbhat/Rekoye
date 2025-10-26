import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const isAdminAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header (for Postman testing)
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Please login first" });

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch admin by ID from JWT payload
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
