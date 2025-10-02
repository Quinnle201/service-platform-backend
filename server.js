import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import inquiryRoutes from "./routes/inquiryRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error(err));

app.use("/api/inquiries", inquiryRoutes);

app.use("/api/inquiries", (req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
