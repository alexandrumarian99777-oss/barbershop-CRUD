// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  date: String,             // YYYY-MM-DD
  slot: String,             // "10:00", "11:00", ...
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
