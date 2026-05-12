import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./AllEvents.css";

export default function AllEvents() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchEvents = async () => {
    try {
      const res = await fetch("https://eventify-ai-e28l.onrender.com/api/events/all");
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to load events.");
        return;
      }

      setAllEvents(data.events);
    } catch (err) {
      setError("Server error. Could not load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatPrice = (price) => {
    if (!price) return "Free";

    if (price.toLowerCase() === "free") return "Free";

    if (price.startsWith("$")) return price;

    return `$${price}`;
  };
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

const normalize = (text) => {
  return text
    ?.toLowerCase()
    .replace(/&/g, "and")
    .replace(/s\b/g, "")
    .trim();
};

const filteredEvents = allEvents.filter((event) => {
  const query = normalize(searchQuery);

  return (
    normalize(event.title)?.includes(query) ||
    normalize(event.type)?.includes(query) ||
    normalize(event.location)?.includes(query) ||
    normalize(event.description)?.includes(query) ||
    normalize(event.price)?.includes(query)
  );
});
const getImageUrl = (image) => {
  if (!image) return "";

  const cleanImage = image.replaceAll('"', "");

  if (cleanImage.startsWith("http")) {
    return cleanImage;
  }

  return `https://eventify-ai-e28l.onrender.com${cleanImage}`;
};
  return (
    <main className="all-events-page">
      <section className="all-events-section">
        <div className="all-events-header">
          <p className="section-label">Events</p>
          <p></p>
          <p></p>
          <p>
            Discover all available events, including the latest events created
            by users.
          </p>
        </div>

        {loading && <p className="all-events-message">Loading events...</p>}
        {error && <p className="all-events-error">{error}</p>}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="all-events-empty">
            <h2>No events available yet</h2>
            <p>Created events will appear here.</p>
          </div>
        )}

        <div className="all-events-grid">
          {filteredEvents.map((event) => (
            <div className="all-event-card" key={event._id}>
              <div className="all-event-image">
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title}
                />
              </div>

              <div className="all-event-content">
                <span className="all-event-status">{event.type}</span>

                <h3>{event.title}</h3>

                <p className="all-event-date">
                  {event.date} • {formatTime(event.time)}
                </p>

                <p className="all-event-location">{event.location}</p>

                <div className="all-seats-row">
                  <p>Available seats:</p>
                  <span>{event.seats}</span>
                </div>

                <hr className="all-seats-line" />

                <p className="all-event-description">
                  {event.description}
                </p>

                <div className="all-event-footer">
                  <span>{formatPrice(event.price)}</span>
                  <Link
                    to={`/event/${event.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")}`}
                  >
                    <button>Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}