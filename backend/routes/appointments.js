// backend/routes/appointments.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create appointment (public)
// If a CONFIRMED appointment exists for the same date+time => reject
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, date, time, service } = req.body;

    if (!name || !phone || !email || !date || !time || !service) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Prevent booking if slot already CONFIRMED
    const alreadyConfirmed = await Appointment.findOne({
      date,
      time,
      status: "confirmed",
    });

    if (alreadyConfirmed) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already taken (confirmed). Please choose another time.",
      });
    }

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
    return res.status(201).json({ success: true, appointment: newAppt });
  } catch (err) {
    console.error("Create Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all appointments (admin or public as your app needs)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    return res.status(200).json({ success: true, appointments });
  } catch (err) {
    console.error("Fetch Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get confirmed booked time slots for a given date
// This endpoint returns only confirmed times — frontend should call this to disable slots.
router.get("/booked/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const confirmed = await Appointment.find({ date, status: "confirmed" }).select("time -_id");
    const times = confirmed.map((c) => c.time);
    return res.json(times);
  } catch (err) {
    console.error("Booked Slots Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Update appointment (full update)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, appointment: updated });
  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
