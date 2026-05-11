const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendReminderEmail = async (to, event) => {
  await transporter.sendMail({
    from: `"Eventify AI" <${process.env.EMAIL_USER}>`,
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
  await transporter.sendMail({
    from: `"Eventify AI" <${process.env.EMAIL_USER}>`,
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

        <p style="margin-top: 20px;">
          Open Eventify AI and register for this event.
        </p>

        <p style="color:#777;">Eventify AI</p>
      </div>
    `,
  });
};

module.exports = {
  sendReminderEmail,
  sendInvitationEmail,
};
