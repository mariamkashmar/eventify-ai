require("dotenv").config();
const express = require('express'); // import express
const cors = require('cors');
const app = express();
const path = require("path");

app.use(cors());

//middleware functions to run between backend and frontend
app.use(express.json()); // can accept JSON data from request
const db=require('./Config/Config');
const userRoute = require("./Routes/userRoute");
const eventRoute = require("./Routes/eventRoute");
const registrationRoute = require("./Routes/registrationRoute");
const aiRoute = require("./Routes/aiRoute");
const startReminderService = require("./Services/reminderService");
const inviteRoute = require("./Routes/inviteRoute");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/ai", aiRoute);

app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/registrations", registrationRoute);
app.use("/api/ai", aiRoute);
app.use("/api/invites", inviteRoute);


app.get("/", (req, res) => {
  res.send("Eventify Backend is Running");
});
// start the server
// server is listening to the requests /users /products
/**   we need to decide the port 
http://localhost:PORT/
:3000
:5000
:3456
*/
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log("Server is running on port ",PORT)
    startReminderService();
})

