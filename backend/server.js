const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// DATABASE
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/admin", require("./routes/adminAuth"));

// HEALTH CHECK FOR RENDER
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// SERVE REACT FRONTEND
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
