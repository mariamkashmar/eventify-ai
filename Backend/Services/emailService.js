const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is missing in environment variables");
    }

    if (!to) {
      throw new Error("Recipient email is missing");
    }

    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Eventify AI",
          email: "eventify.reminders@gmail.com",
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    const data = await res.json();

    console.log("Brevo status:", res.status);
    console.log("Brevo response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Email sending failed");
    }

    return data;
  } catch (error) {
    console.error("Email service error:", error.message);
    throw error;
  }
};

const sendReminderEmail = async (to, event) => {
  return sendEmail({
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
  return sendEmail({
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
        <p>${event.description || ""}</p>
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