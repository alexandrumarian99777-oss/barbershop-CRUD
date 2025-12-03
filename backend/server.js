const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/admin-login", require("./routes/adminAuth"));

// IMPORTANT: REMOVE client/build — your frontend is on Render Static Site
// DO NOT SERVE REACT FROM BACKEND

// ROOT CHECK
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
