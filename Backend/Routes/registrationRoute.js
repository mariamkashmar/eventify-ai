const express = require("express");

const {
  registerForEventController,
  getUserRegistrationsController,
  updateRegistrationStatusController,
  deleteRegistrationController,
} = require("../Controllers/registrationController");

const router = express.Router();

router.post("/register", registerForEventController);

router.get("/user/:userId", getUserRegistrationsController);

router.put("/status/:registrationId", updateRegistrationStatusController);

router.delete("/delete/:registrationId/:userId", deleteRegistrationController);

module.exports = router;