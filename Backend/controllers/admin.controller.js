import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

// Helper to create JWT token and set cookie
const createToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // set true in production (HTTPS)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Register admin (optional if you seed admin manually)
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ name, email, password });

    createToken(res, admin._id);

    // Return admin data without password
    const { password: pwd, ...adminData } = admin._doc;
    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: adminData });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    createToken(res, admin._id);

    const { password: pwd, ...adminData } = admin._doc;
    res.status(200).json({ message: "Login successful", admin: adminData });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Logout admin
export const logoutAdmin = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Get admin profile
export const getAdminProfile = async (req, res) => {
  try {
    if (!req.admin) return res.status(404).json({ message: "Admin not found" });

    const { password, ...adminData } = req.admin._doc;
    res.status(200).json(adminData);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: error.message });
  }
};
