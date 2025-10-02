import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);
