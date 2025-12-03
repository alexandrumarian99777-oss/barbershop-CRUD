const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CONNECT DATABASE
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// USER ROUTES
app.use("/api/appointments", require("./routes/appointments"));

// ADMIN LOGIN ONLY
app.use("/api/admin-login", require("./routes/adminAuth"));

// NO auto-login
// NO /api/admin
// NO /api/admin/dashboard

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
