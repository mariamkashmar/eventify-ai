import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate(`/events?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-icon">◆</span>
        <span className="logo-text">eventify</span>
      </div>

      <div className="header-search">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>

        <Link to="/my-events">My Events</Link>

        <Link to="/events">Find Events</Link>

        <Link to="/create-event">Create Events</Link>

        <Link to="/help-center" className="help-link">
          Help Center
          <FaChevronDown className="chevron" />
        </Link>

        <Link to="/my-tickets">Find my tickets</Link>

        <Link to="/signing">Sign in</Link>
      </nav>
    </header>
  );
}