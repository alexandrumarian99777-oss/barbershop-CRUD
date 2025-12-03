const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// CONNECT DATABASE
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/admin", require("./routes/adminAuth")); // IMPORTANT

// ROOT TEST
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
