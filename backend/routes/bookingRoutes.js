// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// All possible slot times
const ALL_SLOTS = [
  "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00"
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


module.exports = router;
