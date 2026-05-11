const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();
require("./Config/Config");

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://eventify-ai-tan.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

const userRoute = require("./Routes/userRoute");
const eventRoute = require("./Routes/eventRoute");
const registrationRoute = require("./Routes/registrationRoute");
const aiRoute = require("./Routes/aiRoute");
const startReminderService = require("./Services/reminderService");
const inviteRoute = require("./Routes/inviteRoute");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/registrations", registrationRoute);
app.use("/api/ai", aiRoute);
app.use("/api/invites", inviteRoute);

app.get("/", (req, res) => {
  res.send("Eventify Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  startReminderService();
});