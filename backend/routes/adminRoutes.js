// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// (Optional) protect these routes with your admin middleware if you have one

// Get all bookings (admin dashboard)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Appointment.find().sort({ createdAt: -1 });
    return res.json({ success: true, bookings });
  } catch (err) {
    console.error("Admin fetch error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// Confirm a booking: check for conflicts first.
// If another confirmed appointment exists for same date+time (different id) => reject.
router.put("/confirm/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ success: false, error: "Not found" });

    // Check if there is an existing confirmed appointment (other than this one) with same date+time
    const conflict = await Appointment.findOne({
      _id: { $ne: id },
      date: appointment.date,
      time: appointment.time,
      status: "confirmed",
    });

    if (conflict) {
      return res.status(409).json({
        success: false,
        message:
          "Cannot confirm this appointment: another appointment is already confirmed for that slot.",
        conflict,
      });
    }

    appointment.status = "confirmed";
    await appointment.save();

    return res.json({ success: true, appointment });
  } catch (err) {
    console.error("Confirm Error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// Optionally add reject route that deletes or sets to rejected
router.put("/reject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ success: false, error: "Not found" });

    appointment.status = "rejected";
    await appointment.save();

    // If you want to auto-delete rejected after a delay, that can be scheduled elsewhere.
    return res.json({ success: true, appointment });
  } catch (err) {
    console.error("Reject Error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
