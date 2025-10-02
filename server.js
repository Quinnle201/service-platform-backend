import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import inquiriesRouter from "./routes/inquiryRoutes.js"; // make sure path is correct

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "*" // For development, allow all origins; later replace with your frontend URL
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Use the router
app.use("/api/inquiries", inquiriesRouter);

// Root route
app.get("/", (req, res) => res.send("Backend is running"));

// Catch-all 404
app.all(/.*/, (req, res) => res.status(404).send("Route not found"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
