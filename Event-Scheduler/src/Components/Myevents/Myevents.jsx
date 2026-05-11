import { useEffect, useState } from "react";
import "./Myevents.css";

export default function Myevents() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
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

  const fetchMyEvents = async () => {
    try {
      if (!user?._id) {
        setError("Please sign in first.");
        return;
      }

      const res = await fetch(
        `https://eventify-ai-e28l.onrender.com/api/events/user/${user._id}`
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setEvents(data.events);
    } catch (err) {
      setError("Failed to load your events.");
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleEditClick = (event) => {
    setEditingEvent({ ...event });
    setMessage("");
    setError("");
  };

  const handleChange = (e) => {
    setEditingEvent({
      ...editingEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditingEvent({
        ...editingEvent,
        newImage: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("creatorId", user._id);
      formData.append("type", editingEvent.type);
      formData.append("title", editingEvent.title);
      formData.append("date", editingEvent.date);
      formData.append("time", editingEvent.time);
      formData.append("location", editingEvent.location);
      formData.append("description", editingEvent.description);
      formData.append("price", editingEvent.price);
      formData.append("seats", editingEvent.seats);
      formData.append("image", editingEvent.image);

      if (editingEvent.newImage) {
        formData.append("image", editingEvent.newImage);
      }

      const res = await fetch(
        `https://eventify-ai-e28l.onrender.com/api/events/update/${editingEvent._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setMessage("Event updated successfully.");
      setEditingEvent(null);
      fetchMyEvents();
    } catch (err) {
      setError("Failed to update event.");
    }
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://eventify-ai-e28l.onrender.com/api/events/delete/${eventId}/${user._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setMessage("Event deleted successfully.");
      fetchMyEvents();
    } catch (err) {
      setError("Failed to delete event.");
    }
  };

  return (
    <main className="my-events-page">
      <section className="my-events-section">
        <div className="my-events-header">
          <p>My Events</p>
          <h1>Events You Created</h1>
          <span>
            Manage your created events, update details, or remove events you no
            longer need.
          </span>
        </div>

        {message && <div className="my-events-success">{message}</div>}
        {error && <div className="my-events-error">{error}</div>}

        {editingEvent && (
          <>
            <h2 className="edit-event-title">Edit Event</h2>

            <form className="edit-event-form" onSubmit={handleUpdate}>
              <div className="edit-form-grid">
                <div className="edit-form-group">
                  <label>Event Type</label>
                  <select
                    name="type"
                    value={editingEvent.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="AI">AI</option>
                    <option value="Business">Business</option>
                    <option value="Networking">Networking</option>
                    <option value="Technology">Technology</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                  </select>
                </div>

                <div className="edit-form-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingEvent.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editingEvent.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={editingEvent.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editingEvent.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Number of Seats</label>
                  <input
                    type="number"
                    name="seats"
                    value={editingEvent.seats}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={editingEvent.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Event Image</label>

                  <label className="edit-upload-box">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageChange}
                      hidden
                    />
                  </label>

                  {(editingEvent.imagePreview || editingEvent.image) && (
                    <img
                      src={
                        editingEvent.imagePreview
                          ? editingEvent.imagePreview
                          : `https://eventify-ai-e28l.onrender.com${editingEvent.image}`
                      }
                      alt="Event preview"
                      className="edit-preview-image"
                    />
                  )}
                </div>
              </div>

              <div className="edit-form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editingEvent.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="edit-form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingEvent(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {events.length === 0 ? (
          <div className="empty-events">
            <h2>No events created yet</h2>
            <p>Once you create events, they will appear here.</p>
          </div>
        ) : (
          <div className="my-events-grid">
            {events.map((event) => (
              <div className="my-event-card" key={event._id}>
                <div className="my-event-image">
                  <img
                    src={`https://eventify-ai-e28l.onrender.com${event.image}`}
                    alt={event.title}
                  />
                </div>

                <div className="my-event-content">
                  <span className="my-event-type">{event.type}</span>

                  <h3>{event.title}</h3>

                  <p className="my-event-date">
                    {event.date} • {formatTime(event.time)}
                  </p>

                  <p className="my-event-location">{event.location}</p>

                  <div className="my-seats-row">
                    <p>Available seats:</p>
                    <span>{event.seats}</span>
                  </div>

                  <hr />

                  <p className="my-event-description">{event.description}</p>

                  <div className="my-event-footer">
                    <strong>
                      {event.price?.toLowerCase() === "free"
                        ? "Free"
                        : event.price?.startsWith("$")
                        ? event.price
                        : `$${event.price}`}
                    </strong>

                    <div className="my-event-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(event)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}