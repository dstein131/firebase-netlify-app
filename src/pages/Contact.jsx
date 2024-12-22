// src/pages/Contact.jsx
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-description">
          We’d love to hear from you! Whether you have questions, feedback, or just want to
          say hello, feel free to reach out.
        </p>
        <div className="contact-details">
          <p><strong>Address:</strong> 123 Coffee Lane, Bean City, CO 12345</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> <a href="mailto:hello@coffeehouse.com">hello@coffeehouse.com</a></p>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="form-input" />
          <input type="email" placeholder="Your Email" className="form-input" />
          <textarea placeholder="Your Message" className="form-textarea"></textarea>
          <button type="submit" className="form-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
