// backend/routes/appointments.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/sendEmail");

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

// Get all appointments
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

// CONFIRM APPOINTMENT + SEND EMAIL  (must be ABOVE /:id)
router.put("/confirm/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    // HTML email body
    const htmlContent = `
      <h2>Your Appointment Is Confirmed</h2>
      <p>Hello ${appointment.name},</p>
      <p>Your appointment on <strong>${appointment.date}</strong> at <strong>${appointment.time}</strong> has been confirmed.</p>
      <p>Service: <strong>${appointment.service}</strong></p>
      <p>See you soon!</p>
    `;

    await sendEmail({
      to: appointment.email,
      subject: "Your Appointment Is Confirmed",
      html: htmlContent,
    });

    return res.json({ success: true, message: "Appointment confirmed + email sent" });
  } catch (error) {
    console.error("Confirm Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
});

// Update appointment
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
