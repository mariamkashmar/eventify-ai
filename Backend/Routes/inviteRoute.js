const express = require("express");
const Event = require("../Models/eventModel");
const { sendInvitationEmail } = require("../Services/emailService");

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { eventId, friendEmail, invitedBy } = req.body;

    if (!eventId || !friendEmail) {
      return res.status(400).json({
        success: false,
        message: "Event and friend email are required.",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    await sendInvitationEmail(
      friendEmail,
      event,
      invitedBy || "Someone"
    );

    res.json({
      success: true,
      message: "Invitation email sent successfully.",
    });
  } catch (error) {
    console.log("Invitation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send invitation email.",
    });
  }
});

module.exports = router;