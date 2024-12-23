// src/pages/Home.jsx

import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="coffee-cup-wrapper">
        {/* Inline SVG Coffee Cup */}
        <svg
          className="coffee-cup"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="#6f4e37"
        >
          <path d="M48 6H16a6 6 0 0 0-6 6v25a18 18 0 0 0 36 0V12a6 6 0 0 0-6-6zM16 10h32a2 2 0 0 1 2 2v25a14 14 0 0 1-28 0V12a2 2 0 0 1 2-2zm46 20a8 8 0 0 1-8 8 2 2 0 0 1 0-4 4 4 0 0 0 0-8 2 2 0 0 1 0-4 8 8 0 0 1 8 8zm-16 22H18a2 2 0 0 0 0 4h32a2 2 0 0 0 0-4z" />
        </svg>
        {/* Optional: Add Steam Effect */}
        <div className="steam">
          <div className="steam-line"></div>
          <div className="steam-line"></div>
          <div className="steam-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
