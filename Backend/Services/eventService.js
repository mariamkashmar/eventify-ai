const Event = require("../Models/eventModel");

const createEvent = async (eventData) => {
  const event = await Event.create(eventData);
  return event;
};

const getAllEvents = async () => {
  const events = await Event.find().sort({ createdAt: -1 });
  return events;
};

const getUserEvents = async (creatorId) => {
  const events = await Event.find({ creatorId }).sort({ createdAt: -1 });
  return events;
};

const updateEvent = async (eventId, creatorId, updatedData) => {
  const event = await Event.findOneAndUpdate(
    { _id: eventId, creatorId },
    updatedData,
    { new: true }
  );

  return event;
};

const deleteEvent = async (eventId, creatorId) => {
  const event = await Event.findOneAndDelete({
    _id: eventId,
    creatorId,
  });

  return event;
};

module.exports = {
  createEvent,
  getAllEvents,
  getUserEvents,
  updateEvent,
  deleteEvent,
};