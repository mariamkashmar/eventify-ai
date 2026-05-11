const Registration = require("../Models/registrationModel");

const registerForEvent = async (userId, eventId) => {
  const existingRegistration = await Registration.findOne({
    userId,
    eventId,
  });

  if (existingRegistration) {
    throw new Error("You already registered for this event");
  }

  const registration = await Registration.create({
    userId,
    eventId,
    status: "upcoming",
  });

  return registration;
};

const getUserRegistrations = async (userId) => {
  const registrations = await Registration.find({ userId })
    .populate("eventId")
    .sort({ createdAt: -1 });

  return registrations;
};

const updateRegistrationStatus = async (registrationId, userId, status) => {
  const registration = await Registration.findOneAndUpdate(
    { _id: registrationId, userId },
    { status },
    { new: true }
  ).populate("eventId");

  return registration;
};

const deleteRegistration = async (registrationId, userId) => {
  const registration = await Registration.findOneAndDelete({
    _id: registrationId,
    userId,
  });

  return registration;
};

module.exports = {
  registerForEvent,
  getUserRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
};