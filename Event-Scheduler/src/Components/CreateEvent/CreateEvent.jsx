import { useState } from "react";
import "./CreateEvent.css";

export default function CreateEvent() {
  const [aiLoading, setAiLoading] = useState(false);

  const [eventData, setEventData] = useState({
    type: "",
    otherType: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: "",
    seats: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEventData({
        ...eventData,
        image: file,
      });

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?._id) {
      alert("Please sign in first.");
      return;
    }

    const formData = new FormData();

    formData.append("creatorId", user._id);
    formData.append(
      "type",
      eventData.type === "Others" ? eventData.otherType : eventData.type
    );
    formData.append("title", eventData.title);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("description", eventData.description);
    formData.append("price", eventData.price);
    formData.append("seats", eventData.seats);

    // IMPORTANT
    formData.append("image", eventData.image);

    try {
      const res = await fetch("http://eventify-ai-e28l.onrender.com/api/events/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Event created successfully!");

      setEventData({
        type: "",
        otherType: "",
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        price: "",
        seats: "",
        image: null,
      });

      setPreviewImage(null);
    } catch (error) {
      alert("Failed to create event.");
    }
  };
  const generateDescription = async () => {
    try {
      setAiLoading(true);

      const res = await fetch("http://eventify-ai-e28l.onrender.com/api/ai/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: eventData.title,
          category: eventData.type,
          location: eventData.location,
          date: eventData.date,
          time: eventData.time,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setEventData({
          ...eventData,
          description: data.description,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("AI description failed");
    } finally {
      setAiLoading(false);
    }
  };
  return (
    <div className="create-event-page">
      <section className="create-event-section">
        <div className="create-event-header">
          <p className="section-label">Create Event</p>
          <h1>Add a New Event</h1>
          <p className="section-description">
            Create and manage professional event listings with clear details, engaging descriptions, pricing, seat availability, and event images.
          </p>
        </div>

        <div className="create-event-content">
          <form className="create-event-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Event Type</label>
                <select
                  name="type"
                  value={eventData.type}
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
                  <option value="Others">Others</option>
                </select>
                {eventData.type === "Others" && (
                  <div className="form-group">
                    <label>Specify Event Type</label>
                    <input
                      type="text"
                      name="otherType"
                      placeholder="Enter event type"
                      value={eventData.otherType}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="AI & Business Innovation Summit"
                  value={eventData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Beirut Digital District"
                  value={eventData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of Seats</label>
                <input
                  type="number"
                  name="seats"
                  placeholder="100"
                  value={eventData.seats}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Free or 12.00"
                  value={eventData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Event Image</label>

                <label className="upload-box">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>

                {eventData.image && (
                  <p className="file-name">{eventData.image.name}</p>
                )}
              </div>
            </div>

            <button
              type="button"
              className="ai-generate-btn"
              onClick={generateDescription}
              disabled={aiLoading}
            >
              {aiLoading ? "Generating..." : "✨ Generate Description with AI"}
            </button>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Write a short description about the event..."
                value={eventData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="create-event-btn">
              Create Event
            </button>
          </form>

          <div className="event-preview-card">
            <div className="preview-image">
              {previewImage ? (
                <img src={previewImage} alt="Event preview" />
              ) : (
                <span>Image Preview</span>
              )}
            </div>

            <div className="preview-body">
              <span className="event-badge">
                {eventData.type === "Others"
                  ? eventData.otherType || "Event Type"
                  : eventData.type || "Event Type"}
              </span>

              <h2>{eventData.title || "Event Title"}</h2>

              <p className="preview-date">
                {eventData.date || "Event Date"} • {eventData.time || "Time"}
              </p>

              <p className="preview-location">
                {eventData.location || "Event Location"}
              </p>

              <div className="preview-seats-row">
                <p>Available seats:</p>
                <span>{eventData.seats || "0"}</span>
              </div>

              <hr className="preview-line" />

              <p className="preview-description">
                {eventData.description ||
                  "Your event description will appear here."}
              </p>

              <div className="preview-footer">
                <h3>
                  {eventData.price
                    ? eventData.price.toLowerCase() === "free"
                      ? "Free"
                      : eventData.price.startsWith("$")
                        ? eventData.price
                        : `$${eventData.price}`
                    : "Free"}
                </h3>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}