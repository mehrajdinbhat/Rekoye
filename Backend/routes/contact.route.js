import express from "express";
import {
  createContact,
  deleteContact,
  getContacts,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/contact", createContact);
router.get("/contact", getContacts); // 👈 for admin panel
router.delete("/contact/:id", deleteContact);

export default router;
