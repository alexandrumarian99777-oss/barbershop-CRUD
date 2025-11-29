const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// GET all appointments (Admin)
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments); // MUST return array!
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE appointment
router.put("/appointments/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update" });
  }
});

// DELETE appointment
router.delete("/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
