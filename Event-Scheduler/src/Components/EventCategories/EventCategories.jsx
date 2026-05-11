import React from "react";
import {
  FaMicrophone,
  FaMusic,
  FaMasksTheater,
  FaCalendarCheck,
  FaUsers,
  FaGamepad,
  FaBriefcase,
  FaUtensils,
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import "./EventCategories.css";

const categories = [
  { title: "Music", icon: <FaMicrophone /> },
  { title: "Nightlife", icon: <FaMusic /> },
  { title: "Arts & Culture", icon: <FaMasksTheater /> },
  { title: "Workshops", icon: <FaCalendarCheck /> },
  { title: "Networking", icon: <FaUsers /> },
  { title: "Gaming", icon: <FaGamepad /> },
  { title: "Business", icon: <FaBriefcase /> },
  { title: "Food & Drink", icon: <FaUtensils /> },
];

function EventCategories() {
  const navigate = useNavigate();

  return (
    <section className="event-categories">
      <div className="categories-wrapper">
        {categories.map((category, index) => (
          <div
            className="category-item"
            key={index}
            onClick={() =>
              navigate(
                `/events?search=${encodeURIComponent(category.title)}`
              )
            }
          >
            <div className="category-circle">
              {category.icon}
            </div>

            <p>{category.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventCategories;