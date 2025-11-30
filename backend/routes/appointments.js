const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// CREATE appointment
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, date, time, service } = req.body;

    const newAppt = new Appointment({
      name,
      phone,
      email,
      date,
      time,
      service,
      status: "pending",
    });

    await newAppt.save();

    res.status(201).json({ success: true, appointment: newAppt });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json({ success: true, appointments });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// UPDATE appointment
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, appointment: updated });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// CONFIRM appointment
router.put("/confirm/:id", async (req, res) => {
  try {
    const confirmed = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );

    if (!confirmed) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, appointment: confirmed });
  } catch (err) {
    console.error("Confirm Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
