import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";


import contactRoute from "./routes/contact.route.js";
import adminRoute from "./routes/admin.route.js";
import productRoute from "./routes/product.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"], // your frontend port
    credentials: true,
  })
);
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

//  database connection
try {
  mongoose.connect(MONGO_URL);
  console.log("connected to mongoDB");
} catch (error) {
  console.log("could not connect to mongodb");
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
// defining routes
app.use("/api", contactRoute);
app.use("/api/admin", adminRoute);
app.use("/api/products", productRoute);

// Start server

app.listen(PORT, () => {
  console.log(`Server is running  on port ${PORT}...`);
});
