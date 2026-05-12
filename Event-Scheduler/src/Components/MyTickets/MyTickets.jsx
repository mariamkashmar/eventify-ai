import { useEffect, useState } from "react";
import "./MyTickets.css";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTickets = async () => {
    try {
      if (!user?._id) {
        setError("Please sign in first.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://eventify-ai-e28l.onrender.com/api/registrations/user/${user._id}`
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to load tickets.");
        return;
      }

      setTickets(data.registrations);
    } catch (err) {
      setError("Server error. Could not load your tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getUserStatus = (status) => {
    if (!status || status === "upcoming") return "attending";
    return status;
  };

  const formatStatus = (status) => {
    const cleanStatus = getUserStatus(status);
    return cleanStatus.charAt(0).toUpperCase() + cleanStatus.slice(1);
  };

  const getEventTimeStatus = (date, time) => {
    const eventDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    return eventDateTime > now ? "Upcoming" : "Ended";
  };

  const handleStatusChange = async (registrationId, newStatus) => {
    try {
      setMessage("");
      setError("");

      if (newStatus === "declined") {
        const confirmDecline = window.confirm(
          "Are you sure you want to decline this event? Your ticket will be removed."
        );

        if (!confirmDecline) return;

        const res = await fetch(
          `https://eventify-ai-e28l.onrender.com/api/registrations/delete/${registrationId}/${user._id}`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Failed to remove ticket.");
          return;
        }

        setMessage("Ticket removed successfully.");
        fetchTickets();
        return;
      }

      const res = await fetch(
        `https://eventify-ai-e28l.onrender.com/api/registrations/status/${registrationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            status: newStatus,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to update status.");
        return;
      }

      setMessage("Ticket status updated successfully.");
      fetchTickets();
    } catch (err) {
      setError("Server error. Could not update ticket.");
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Free";
    if (price.toLowerCase() === "free") return "Free";
    if (price.startsWith("$")) return price;
    return `$${price}`;
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
    <main className="my-tickets-page">
      <section className="my-tickets-section">
        <div className="my-tickets-header">
          <p className="section-label">Find My Tickets</p>
          <h1>My Registered Events</h1>
          <span>
            View your registered events and update your attendance status.
          </span>
        </div>

        {message && <div className="tickets-success">{message}</div>}
        {error && <div className="tickets-error">{error}</div>}
        {loading && <p className="tickets-loading">Loading tickets...</p>}

        {!loading && !error && tickets.length === 0 && (
          <div className="tickets-empty">
            <h2>No tickets yet</h2>
            <p>Register for an event and it will appear here.</p>
          </div>
        )}

        <div className="tickets-grid">
          {tickets.map((ticket) => {
            const event = ticket.eventId;
            if (!event) return null;

            const userStatus = getUserStatus(ticket.status);
            return (
              <div className="ticket-card" key={ticket._id}>
                <div className="ticket-image">
                 <img
  src={getImageUrl(event.image)}
  alt={event.title}
/>
                </div>

                <div className="ticket-content">
                  <div className="ticket-top-row">
                    <span className="ticket-type">{event.type}</span>

                    <div className="ticket-status-group">
                      <span className="ticket-status upcoming">
                        {getEventTimeStatus(event.date, event.time)}
                      </span>

                      <span className={`ticket-status ${userStatus}`}>
                        {formatStatus(userStatus)}
                      </span>
                    </div>
                  </div>

                  <h3>{event.title}</h3>

                  <p className="ticket-date">
                    {event.date} • {formatTime(event.time)}
                  </p>

                  <p className="ticket-location">{event.location}</p>

                  <div className="ticket-seats-row">
                    <p>Available seats:</p>
                    <span>{event.seats}</span>
                  </div>

                  <hr />

                  <p className="ticket-description">{event.description}</p>

                  <div className="ticket-footer">
                    <strong>{formatPrice(event.price)}</strong>

                    <select
                      value={userStatus}
                      onChange={(e) =>
                        handleStatusChange(ticket._id, e.target.value)
                      }
                    >
                      <option value="attending">Attending</option>
                      <option value="maybe">Maybe</option>
                      <option value="declined">Decline ticket</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}