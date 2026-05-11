import {
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
  FaRobot,
  FaCalendarCheck,
  FaUsers,
  FaSearch,
  FaTicketAlt,
} from "react-icons/fa";

import "./HelpCenter.css";

export default function HelpCenter() {
  return (
    <div className="help-page">
      <section className="help-hero">
        <span className="help-badge">Support Center</span>
        <h1>How can we help you?</h1>
        <p>
          Find answers, learn how Eventify AI works, and discover how our
          platform helps you create, manage, and attend events smarter.
        </p>
      </section>

      <section className="help-content">
        <div className="help-card contact-card">
          <h2>Contact Us</h2>
          <p>
            Need help with your account, events, tickets, or invitations?
            Our support team is ready to assist you.
          </p>

          <div className="contact-info">
            <div>
              <FaEnvelope />
              <span>support@eventifyai.com</span>
            </div>

            <div>
              <FaPhoneAlt />
              <span>+1 415 982 7643</span>
            </div>
          </div>
        </div>

        <div className="help-card">
          <h2>How You Benefit From Eventify AI</h2>

          <div className="benefits-grid">
            <div className="benefit-box">
              <FaCalendarCheck />
              <h3>Easy Event Management</h3>
              <p>
                Create, edit, delete, and organize events with clear details
                like date, time, location, and description.
              </p>
            </div>

            <div className="benefit-box">
              <FaRobot />
              <h3>AI Assistance</h3>
              <p>
                Generate professional event descriptions and improve event
                content using smart AI features.
              </p>
            </div>

            <div className="benefit-box">
              <FaUsers />
              <h3>Guest Invitations</h3>
              <p>
                Invite users to events and track who is attending, maybe,
                declined, or upcoming.
              </p>
            </div>

            <div className="benefit-box">
              <FaSearch />
              <h3>Smart Search</h3>
              <p>
                Quickly find events by title, location, date range, or event
                details.
              </p>
            </div>

            <div className="benefit-box">
              <FaTicketAlt />
              <h3>My Tickets</h3>
              <p>
                Users can view their registered events and manage their tickets
                in one organized page.
              </p>
            </div>

            <div className="benefit-box">
              <FaQuestionCircle />
              <h3>Simple User Experience</h3>
              <p>
                A clean and modern interface makes it easy for users to
                navigate and manage their events.
              </p>
            </div>
          </div>
        </div>

        <div className="help-card faq-card">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>How do I create an event?</h3>
            <p>
              Go to the Create Event page, fill in the event details, then save
              it to publish your event.
            </p>
          </div>

          <div className="faq-item">
            <h3>Where can I see my registered events?</h3>
            <p>
              You can find all your registered events inside the My Tickets
              page.
            </p>
          </div>

          <div className="faq-item">
            <h3>What does attending, maybe, and declined mean?</h3>
            <p>
              These statuses show your response to an event invitation:
              attending means you accepted, maybe means you are unsure, and
              declined means you are not joining.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}