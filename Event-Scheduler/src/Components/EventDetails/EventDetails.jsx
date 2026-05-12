import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css";

export default function EventDetails() {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
const handleInvite = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("https://eventify-ai-e28l.onrender.com/api/invites/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: event._id,
        friendEmail,
        invitedBy: user?.firstname || user?.email || "Someone",
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setInviteMessage(data.message);
      return;
    }

    setInviteMessage("Invitation sent successfully!");
    setFriendEmail("");
  } catch (error) {
    setInviteMessage("Failed to send invitation.");
  }
};
  const fetchEvent = async () => {
    try {
      const res = await fetch("https://eventify-ai-e28l.onrender.com/api/events/all");
      const data = await res.json();

      if (!data.success) {
        setError("Failed to load event.");
        return;
      }

      const foundEvent = data.events.find(
  (e) =>
    e.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") === slug
);

      if (!foundEvent) {
        setError("Event not found.");
        return;
      }

      setEvent(foundEvent);
    } catch (err) {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleRegister = async () => {
    try {
      if (!user?._id) {
        setError("Please sign in first.");
        return;
      }

      const res = await fetch(
        "https://eventify-ai-e28l.onrender.com/api/registrations/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            eventId: event._id,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setMessage("Successfully registered for the event.");
    } catch (err) {
      setError("Failed to register.");
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Free";

    if (price.toLowerCase() === "free") return "Free";

    if (price.startsWith("$")) return price;

    return `$${price}`;
  };

  if (loading) {
    return (
      <div className="event-details-loading">
        Loading event...
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="event-details-error">
        {error}
      </div>
    );
  }
  const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");

  const date = new Date();
  date.setHours(hour, minute);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
const getImageUrl = (image) => {
  if (!image) return "";

  const cleanImage = image.replaceAll('"', "");

  if (cleanImage.startsWith("http")) {
    return cleanImage;
  }

  return `https://eventify-ai-e28l.onrender.com${cleanImage}`;
};
  return (
    <main className="event-details-page">
      <section className="event-details-section">
        {message && (
          <div className="event-success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="event-error-message">
            {error}
          </div>
        )}

        <div className="event-details-card">
          <div className="event-details-image">
            <img
              src={getImageUrl(event.image)}
              alt={event.title}
            />
          </div>

          <div className="event-details-content">
            <span className="event-type-badge">
              {event.type}
            </span>

            <h1>{event.title}</h1>

            <div className="event-info-grid">
              <div className="event-info-box">
                <h3>Date & Time</h3>
                <p>
                  {event.date} • {formatTime(event.time)}
                </p>
              </div>

              <div className="event-info-box">
                <h3>Location</h3>
                <p>{event.location}</p>
              </div>

              <div className="event-info-box">
                <h3>Available Seats</h3>
                <p>{event.seats}</p>
              </div>

              <div className="event-info-box">
                <h3>Price</h3>
                <p>{formatPrice(event.price)}</p>
              </div>
            </div>

            <div className="event-description-box">
              <h2>About This Event</h2>

              <p>{event.description}</p>
            </div>

            <div className="event-features">
              <div className="feature-item">
                Professional networking opportunities
              </div>

              <div className="feature-item">
                Interactive sessions and discussions
              </div>

              <div className="feature-item">
                Access to industry experts and mentors
              </div>

              <div className="feature-item">
                Event participation certificate
              </div>
            </div>

            <button
              className="register-event-btn"
              onClick={handleRegister}
            >
              Register For Event
            </button>
            <form className="invite-box" onSubmit={handleInvite}>
  <h3>Invite a Friend</h3>

  <input
    type="email"
    placeholder="Friend email address"
    value={friendEmail}
    onChange={(e) => setFriendEmail(e.target.value)}
    required
  />

  <button type="submit">Send Invitation</button>

  {inviteMessage && (
  <p
    className={
      inviteMessage.toLowerCase().includes("success")
        ? "invite-success"
        : "invite-error"
    }
  >
    {inviteMessage}
  </p>
)}
</form>
          </div>
        </div>
      </section>
    </main>
  );
}