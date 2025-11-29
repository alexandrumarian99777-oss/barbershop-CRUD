const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports.sendConfirmationEmail = async (appointment) => {
  const { name, phone, date, time } = appointment;

  const mailOptions = {
    from: `"Barber Shop" <${process.env.EMAIL_USER}>`,
    to: appointment.email || process.env.ADMIN_EMAIL, // if you add email field
    subject: "Your Appointment Confirmation",
    html: `
      <h2>Appointment Confirmed</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your appointment has been <strong>successfully booked</strong>!</p>
      
      <h3>Appointment Details:</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Phone:</strong> ${phone}</p>

      <br>
      <p>Thank you for choosing our barber shop! 💈</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Email to admin
module.exports.sendAdminNotification = async (appointment) => {
  const { name, phone, date, time } = appointment;

  await transporter.sendMail({
    from: `"Barber Shop" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Appointment Booked",
    html: `
      <h2>New Appointment</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
    `
  });
};
