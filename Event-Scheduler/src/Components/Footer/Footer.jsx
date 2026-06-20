import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">◆</span>
            <span className="footer-logo-text">eventify</span>
          </div>
          <p>Create, manage, and discover events smarter with AI-powered tools.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/events">All Events</Link>
          <Link to="/create-event">Create Event</Link>
          <Link to="/help-center">Help Center</Link>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/my-events">My Events</Link>
          <Link to="/my-tickets">My Tickets</Link>
          <Link to="/signing">Sign In</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>support@eventifyai.com</p>
          <p>+1 415 982 7643</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Eventify AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
