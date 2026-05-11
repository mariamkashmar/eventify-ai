import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url("/HeroPhoto/Schedule1.jpg")`,
      }}
    >
      <div className="overlay">
        <div className="hero-content">
          <span className="hero-badge">AI Powered Event Scheduler</span>

          <h1>Create, manage, and discover events smarter.</h1>

          <p>
            Plan events, invite guests, track attendance status, search events,
            and use AI to generate professional event descriptions instantly.
          </p>

          <div className="hero-buttons">
            <Link to='/events'>
            <button className="hero-primary-btn">Explore Events</button>
            </Link>
            <Link to='/create-event'>
            <button className="hero-secondary-btn">Create Event</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
