// src/pages/About.jsx
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About CoffeeHouse</h1>
        <p className="about-description">
          At CoffeeHouse, we believe in creating a space where everyone feels at home. From 
          our carefully crafted coffee blends to our cozy atmosphere, every detail is designed 
          to provide a memorable experience.
        </p>
        <p className="about-description">
          Our journey began with a passion for coffee and a desire to bring people together. 
          Whether you're here to work, catch up with friends, or simply enjoy a quiet moment, 
          we strive to make every visit special.
        </p>
        <p className="about-mission">
          <strong>Our Mission:</strong> To brew happiness, one cup at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
