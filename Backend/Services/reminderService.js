const cron = require("node-cron");
const Registration = require("../Models/registrationModel");
const { sendReminderEmail } = require("./emailService");

const startReminderService = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("Reminder service checking...");

      const registrations = await Registration.find({
        reminderSent: false,
        status: { $in: ["attending", "upcoming"] },
      })
        .populate("userId")
        .populate("eventId");

      const now = new Date();

      for (const registration of registrations) {
        const user = registration.userId;
        const event = registration.eventId;

        if (!user || !event) continue;

        const eventDateTime = new Date(`${event.date}T${event.time}:00+03:00`);
        const difference = eventDateTime - now;
        const oneHour = 60 * 60 * 1000;

        console.log("Checking reminder:", {
          userEmail: user.email,
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          registrationStatus: registration.status,
          differenceMinutes: Math.round(difference / 60000),
        });

        if (difference > 0 && difference <= oneHour) {
          await sendReminderEmail(user.email, event);

          registration.reminderSent = true;
          registration.status = "attending";
          await registration.save();

          console.log(`Reminder sent to ${user.email}`);
        }
      }
    } catch (error) {
      console.log("Reminder service error:", error);
    }
  });
};

module.exports = startReminderService;