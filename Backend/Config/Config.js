const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Event-Scheduler");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to Event-Scheduler MongoDB");
});

module.exports = db;