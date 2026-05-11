const {
  registerForEvent,
  getUserRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
} = require("../Services/RegistrationService");

const Event = require("../Models/eventModel");

const registerForEventController = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Event ID are required",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.seats <= 0) {
      return res.status(400).json({
        success: false,
        message: "No seats available for this event",
      });
    }

    const registration = await registerForEvent(userId, eventId);

    event.seats -= 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: "Registered for event successfully",
      registration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserRegistrationsController = async (req, res) => {
  try {
    const { userId } = req.params;

    const registrations = await getUserRegistrations(userId);

    res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRegistrationStatusController = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { userId, status } = req.body;

    if (!["upcoming", "attending", "maybe", "declined"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const registration = await updateRegistrationStatus(
      registrationId,
      userId,
      status
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRegistrationController = async (req, res) => {
  try {
    const { registrationId, userId } = req.params;

    const registration = await deleteRegistration(registrationId, userId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    await Event.findByIdAndUpdate(registration.eventId, {
      $inc: { seats: 1 },
    });

    res.status(200).json({
      success: true,
      message: "Ticket removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerForEventController,
  getUserRegistrationsController,
  updateRegistrationStatusController,
  deleteRegistrationController,
};