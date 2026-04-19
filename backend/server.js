import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";


dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: ["https://blood-bank-management-system-pawr.onrender.com", "http://localhost:5173", "https://blood-bank-management-system-6e0d.onrender.com", "https://blood-bank-management-system-backend-r7cp.onrender.com"],
  credentials: true,
}));


// 🧩 Routes

app.use("/api/auth", authRoutes);


app.use("/api/donor", donorRoutes);

app.use("/api/facility", facilityRoutes);

app.use("/api/admin", adminRoutes);



import bloodLabRoutes from "./routes/bloodLabRoutes.js";
app.use("/api/blood-lab", bloodLabRoutes);


import hospitalRoutes from "./routes/hospitalRoutes.js";
app.use("/api/hospital", hospitalRoutes);

import campRoutes from "./routes/campRoutes.js";
app.use("/api/camps", campRoutes);


// 🏠 Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Blood Bank Management System API",
    status: "running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      donor: "/api/donor",
      facility: "/api/facility",
      admin: "/api/admin",
      bloodLab: "/api/blood-lab",
      hospital: "/api/hospital",
      camps: "/api/camps"
    }
  });
});

// 🗄️ DB Connection
const PORT = process.env.PORT || 5000;

// Start server first, then connect to DB
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => {
      console.log("MongoDB Error ❌", err);
      console.log("Server running but database not connected");
    });
});
