const nodemailer = require("nodemailer");

console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendReminderEmail = async (to, event) => {
  console.log("Sending reminder email to:", to);

  await transporter.sendMail({
    from: `"Eventify AI" <eventify.reminders@gmail.com>`,
    to,
    subject: `Reminder: ${event.title} is coming soon`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#f05537;">Event Reminder</h2>
        <p>Hello,</p>
        <p>This is a reminder that your event is coming soon:</p>
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>We look forward to seeing you!</p>
        <p style="color:#777;">Eventify AI</p>
      </div>
    `,
  });
};

const sendInvitationEmail = async (to, event, invitedBy) => {
  console.log("Sending invitation email to:", to);

  await transporter.sendMail({
    from: `"Eventify AI" <eventify.reminders@gmail.com>`,
    to,
    subject: `${invitedBy} invited you to ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#f05537;">You're Invited!</h2>
        <p><strong>${invitedBy}</strong> invited you to attend this event:</p>
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <p style="margin-top: 20px;">Open Eventify AI and register for this event.</p>
        <p style="color:#777;">Eventify AI</p>
      </div>
    `,
  });
};

module.exports = {
  sendReminderEmail,
  sendInvitationEmail,
};