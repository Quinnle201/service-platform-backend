import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// Create new inquiry
router.post("/", async (req, res) => {
  try {
    console.log("New Inquiry:", req.body); // <-- logs inquiry to console
    const newInquiry = new Inquiry(req.body);
    const saved = await newInquiry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all inquiries (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
