// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env
dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: "*" // For development, allow all origins; later replace with your frontend URL
}));
app.use(express.json()); // To parse JSON requests

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// ===== Routes =====
app.post("/api/inquiries", async (req, res) => {
  try {
    const inquiry = req.body;
    console.log("Received inquiry:", inquiry);

    // Here you can save to DB
    // Example: await Inquiry.create(inquiry);

    res.status(200).json({ message: "Quote request received!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
