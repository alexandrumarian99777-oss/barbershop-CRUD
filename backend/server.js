const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminRoutes = require('./routes/adminRoutes');

dotenv.config(); // LOAD .env FIRST

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

// ROUTES
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/admin", require("./routes/adminAuth"));
app.use('/api/admin', adminRoutes);


// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
