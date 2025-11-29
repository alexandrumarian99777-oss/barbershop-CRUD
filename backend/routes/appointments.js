const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const { createAppointment } = require("../controllers/appointmentController");

// Create appointment
router.post("/", createAppointment);

// GET all appointments (Admin Dashboard)
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET booked time slots for a given date
router.get("/booked/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const appointments = await Appointment.find({ date });
        const bookedTimes = appointments.map(a => a.time);
        res.json(bookedTimes);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE appointment (Admin Dashboard)
router.patch("/:id", async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json(updated);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE appointment (Admin Dashboard)
router.delete("/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
