const validateEvent = (data = {}) => {
  const {
    creatorId,
    type,
    title,
    date,
    time,
    location,
    description,
    price,
    seats,
    image,
  } = data;

  if (
    !creatorId ||
    !type ||
    !title ||
    !date ||
    !time ||
    !location ||
    !description ||
    !price ||
    !seats ||
    !image
  ) {
    return "All event fields are required";
  }

  if (Number(seats) < 1) {
    return "Seats must be at least 1";
  }

  return null;
};

module.exports = {
  validateEvent,
};