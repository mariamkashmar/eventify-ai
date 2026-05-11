const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  createEventController,
  getAllEventsController,
  getUserEventsController,
  updateEventController,
  deleteEventController,
  getFeaturedEventsController,
} = require("../Controllers/eventController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), createEventController);

router.get("/all", getAllEventsController);

router.get("/user/:creatorId", getUserEventsController);

router.put("/update/:eventId", upload.single("image"), updateEventController);

router.delete("/delete/:eventId/:creatorId", deleteEventController);

router.get("/featured", getFeaturedEventsController);

module.exports = router;