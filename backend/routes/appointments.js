const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// ===== CREATE APPOINTMENT (POST) =====
router.post("/", async (req, res) => {
  try {
    const { name, phone, date, time } = req.body;

    if (!name || !phone || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newAppointment = new Appointment({
      name,
      phone,
      date,
      time,
      status: "confirmed"
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment
    });
  } catch (err) {
    console.error("POST appointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== GET ALL APPOINTMENTS (ADMIN) =====
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      appointments
    });
  } catch (err) {
    console.error("GET appointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== GET AVAILABLE SLOTS =====
router.get("/available-slots", async (req, res) => {
  try {
    const { date } = req.query;

    const allSlots = ["09:00", "10:00", "11:00", "12:00"];

    const confirmed = await Appointment.find({
      date,
      status: "confirmed"
    }).select("time");

    const confirmedTimes = confirmed.map((t) => t.time);

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
