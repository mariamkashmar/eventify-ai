const Event = require("../Models/eventModel");
const {
  createEvent,
  getAllEvents,
  getUserEvents,
  updateEvent,
  deleteEvent,
} = require("../Services/eventService");

const getFeaturedEventsController = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const { validateEvent } = require("../Validators/eventValidation");

const createEventController = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const eventData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    };

    const validationError = validateEvent(eventData);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const event = await createEvent(eventData);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllEventsController = async (req, res) => {
  try {
    const events = await getAllEvents();

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserEventsController = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const events = await getUserEvents(creatorId);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { creatorId } = req.body;

    const eventData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
    };

    const updatedEvent = await updateEvent(eventId, creatorId, eventData);

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found or you are not allowed to edit it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEventController = async (req, res) => {
  try {
    const { eventId, creatorId } = req.params;

    const deletedEvent = await deleteEvent(eventId, creatorId);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found or you are not allowed to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEventController,
  getAllEventsController,
  getUserEventsController,
  updateEventController,
  deleteEventController,
  getFeaturedEventsController,
};