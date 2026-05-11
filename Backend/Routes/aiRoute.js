const express = require("express");
const router = express.Router();

router.post("/generate-description", async (req, res) => {
  try {
    const { title, category, location, date, time } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Event title is required",
      });
    }

    const templates = [
      `Join us for ${title}, an exciting ${category || "event"} taking place in ${location || "a great location"} on ${date || "the selected date"} at ${time || "the scheduled time"}. This event is designed to bring people together for learning, networking, collaboration, and meaningful experiences.`,

      `${title} is a professionally organized ${category || "event"} happening in ${location || "a special venue"} on ${date || "the selected date"} at ${time || "the scheduled time"}. Attendees will enjoy valuable discussions, new opportunities, and an engaging atmosphere.`,

      `Be part of ${title}, a unique ${category || "event"} hosted in ${location || "a great location"} on ${date || "the selected date"} at ${time || "the scheduled time"}. This event offers a great opportunity to connect, learn, and enjoy a memorable experience.`,
    ];

    const description =
      templates[Math.floor(Math.random() * templates.length)];

    res.json({
      success: true,
      description,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Description generation failed",
    });
  }
});

module.exports = router;