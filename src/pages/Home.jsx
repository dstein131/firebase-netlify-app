// src/pages/Home.jsx

import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to CoffeeHouse</h1>
        <p className="home-description">
          At CoffeeHouse, we brew the finest coffee to kickstart your day. Whether you're
          looking to relax with a cup of your favorite blend or need a cozy spot to work, we've got you covered.
        </p>
        <p className="home-description">
          Our journey began with a passion for coffee and a desire to bring people together.
          Whether you're here to work, catch up with friends, or simply enjoy a quiet moment,
          we strive to make every visit special.
        </p>
        <p className="home-mission">
          <strong>Our Mission:</strong> To brew happiness, one cup at a time.
        </p>
      </div>
    </div>
  );
};

export default Home;
