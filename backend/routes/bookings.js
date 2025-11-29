const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// GET available time slots for a date
router.get("/available-slots", async (req, res) => {
  try {
    const { date } = req.query;

    // All available time slots
    const allSlots = ["09:00", "10:00", "11:00", "12:00"];

    // Get confirmed appointments for this date
    const confirmed = await Appointment.find({
      date,
      status: "confirmed"
    }).select("time");

    const confirmedTimes = confirmed.map((t) => t.time);

    // Filter out already confirmed bookings
    const available = allSlots.filter(
      (slot) => !confirmedTimes.includes(slot)
    );

    res.json(available);
  } catch (err) {
    console.error("Slot fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
