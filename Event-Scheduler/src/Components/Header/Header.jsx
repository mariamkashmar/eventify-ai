import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
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
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
        <button className="search-btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <nav className="header-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/my-events">My Events</NavLink>
        <NavLink to="/events">Explore</NavLink>
        <NavLink to="/create-event">Create Events</NavLink>
        <NavLink to="/help-center" className={({ isActive }) => isActive ? "help-link active" : "help-link"}>
          Help Center
          <FaChevronDown className="chevron" />
        </NavLink>
        <NavLink to="/my-tickets">Find my tickets</NavLink>
        <NavLink to="/signing">Sign in</NavLink>
      </nav>
    </header>
  );
}
