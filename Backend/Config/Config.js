const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = mongoose;