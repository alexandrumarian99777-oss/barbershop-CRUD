const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/", async (req, res) => {
  console.log("SMS endpoint hit");
  console.log("Request body:", req.body);

  const { phone, message } = req.body;

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    console.log("SMS sent:", sms.sid);
    res.json({ success: true });
  } catch (error) {
    console.error("Twilio error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
