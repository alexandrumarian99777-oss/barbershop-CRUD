const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const adminAuthRoutes = require("./routes/adminAuth");

dotenv.config(); // LOAD ENV

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

// ADMIN AUTH ROUTE (login only)
app.use("/api/admin", adminAuthRoutes);

// PROTECTED ADMIN ROUTES (AFTER LOGIN)
app.use("/api/admin/dashboard", adminRoutes);

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
