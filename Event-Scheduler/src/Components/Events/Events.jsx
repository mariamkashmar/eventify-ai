import { useEffect, useState } from "react";
import "./Events.css";
import { Link } from "react-router-dom";
import { formatTime, getImageUrl, formatPrice } from "../../utils";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const res = await fetch(
          "https://eventify-ai-e28l.onrender.com/api/events/featured"
        );

        const data = await res.json();

        if (data.success) {
          setEvents(data.events);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeaturedEvents();
  }, []);

  return (
    <main className="home-page">
      <section className="events-section">
        <div className="events-header">
          <div>
            <p className="section-label">Explore Latest Events</p>
            <h2>Events you may like</h2>
          </div>
          <Link to="/events">
            <button className="view-all-btn">View all events</button>
          </Link>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              <div className="event-image">
                <img src={getImageUrl(event.image)} alt={event.title} />
              </div>

              <div className="event-content">
                <span className="event-status">{event.status}</span>

                <h3>{event.title}</h3>

                <p className="event-date">
                  {event.date} • {formatTime(event.time)}
                </p>
                <p className="event-location">{event.location}</p>
                <div className="seats-row">
                  <p>Available seats:</p>
                  <p className="event-seats">{event.seats}</p>
                </div>
                <hr className="seats-line" />
                <p className="event-description">{event.description}</p>

                <div className="event-footer">
                  <span className="event-price">{formatPrice(event.price)}</span>
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

export default Events;
