// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const sendConfirmationEmail = require("../utils/sendEmail");

// All possible slot times
const ALL_SLOTS = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30"
];

// GET available slots for a date
router.get('/available-slots/:date', async (req, res) => {
  try {
    const date = req.params.date;

    // Get only CONFIRMED bookings for that date
    const confirmed = await Booking.find({ date, status: "confirmed" });

    const blockedSlots = confirmed.map(b => b.slot);

    const available = ALL_SLOTS.filter(slot => !blockedSlots.includes(slot));

    res.json({ available, blockedSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// routes/bookingRoutes.js continued

router.post('/create', async (req, res) => {
  try {
    const { name, phone, service, date, slot } = req.body;

    const booking = new Booking({
      name,
      phone,
      service,
      date,
      slot,
      status: "pending"
    });

    await booking.save();

    res.json({ message: "Booking created (pending)", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/confirm/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "confirmed";
        await booking.save();

        // send email
        await sendConfirmationEmail(
            booking.email,
            booking.name,
            booking.date,
            booking.time,
            booking.service
        );

        res.json({ message: "Booking confirmed and email sent" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error confirming booking" });
    }
});router.put("/confirm/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "confirmed";
        await booking.save();

        // send email (FIXED FIELD NAMES)
        await sendConfirmationEmail(
            booking.email,
            booking.name,
            booking.date,
            booking.slot,    // <----- FIXED HERE
            booking.service
        );

        res.json({ message: "Booking confirmed and email sent" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error confirming booking" });
    }
});




module.exports = router;
