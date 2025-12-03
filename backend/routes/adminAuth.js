const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";
const JWT_SECRET = "231312dfasfsdfwe52345werwerwer";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });

  res.json({ success: true, token });
});

module.exports = router;
