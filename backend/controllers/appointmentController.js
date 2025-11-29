const Appointment = require("../models/Appointment");
const { 
  sendConfirmationEmail, 
  sendAdminNotification 
} = require("../utils/sendEmail");

exports.createAppointment = async (req, res) => {
  try {
    const { name, phone, date, time } = req.body;

    // VALIDATION (unchanged)
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }

    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (appointmentDateTime < now) {
      return res.status(400).json({ error: "Cannot book in the past." });
    }

    const existing = await Appointment.findOne({ date, time });
    if (existing) {
      return res.status(400).json({ error: "This time slot is already booked." });
    }

    // SAVE APPOINTMENT
    const appointment = new Appointment({ name, phone, date, time });
    await appointment.save();

    // SEND EMAILS
    await sendConfirmationEmail(appointment);
    await sendAdminNotification(appointment);

    res.json({ 
      message: "Appointment booked successfully! Confirmation email sent.",
      appointment 
    });

  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
