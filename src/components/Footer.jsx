// Footer.jsx
import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={6} className="footer-left text-center text-md-start">
            <p>&copy; {new Date().getFullYear()} CoffeeHouse. All Rights Reserved.</p>
          </Col>
          <Col md={6} className="footer-right text-center text-md-end">
            <p>
              Follow us on
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Instagram page"
                className="social-icon"
              >
                {/* Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.6.6.6.3 1 .7 1.4 1.4.3.6.5 1.4.6 2.6.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.6 2.6-.3.6-.7 1-1.4 1.4-.6.3-1.4.5-2.6.6-1.3.1-1.8.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.6-.6-.6-.3-1-.7-1.4-1.4-.3-.6-.5-1.4-.6-2.6-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-2 .6-2.6.3-.6.7-1 1.4-1.4.6-.3 1.4-.5 2.6-.6C8.4 2.3 8.8 2.2 12 2.2m0-2.2C8.7 0 8.2 0 6.8.1 5.3.1 4 .4 3 1.1c-1 .7-1.8 1.5-2.5 2.5-.7 1-1 2.3-1.1 3.8C0 8.8 0 9.3 0 12s0 3.2.1 4.5c.1 1.5.4 2.8 1.1 3.8.7 1 1.5 1.8 2.5 2.5 1 .7 2.3 1 3.8 1.1 1.3.1 1.8.1 4.5.1s3.2 0 4.5-.1c1.5-.1 2.8-.4 3.8-1.1 1-.7 1.8-1.5 2.5-2.5.7-1 1-2.3 1.1-3.8.1-1.3.1-1.8.1-4.5s0-3.2-.1-4.5c-.1-1.5-.4-2.8-1.1-3.8-.7-1-1.5-1.8-2.5-2.5C20.8.4 19.5.1 18 .1 16.8 0 16.3 0 12 0z"/>
                  <circle cx="12" cy="12" r="3.2"/>
                  <circle cx="18.4" cy="5.6" r="1.44"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Facebook page"
                className="social-icon"
              >
                {/* Facebook SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.68 0H1.32A1.32 1.32 0 000 1.32v21.36A1.32 1.32 0 001.32 24h11.5v-9.29H9.41v-3.63h3.41V8.41c0-3.39 2.07-5.23 5.09-5.23 1.45 0 2.69.11 3.05.16v3.54h-2.09c-1.64 0-1.96.78-1.96 1.92v2.52h3.91l-.51 3.63h-3.4V24h6.66A1.32 1.32 0 0024 22.68V1.32A1.32 1.32 0 0022.68 0z"/>
                </svg>
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Twitter page"
                className="social-icon"
              >
                {/* Twitter SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.56c-.88.39-1.83.65-2.82.77a4.92 4.92 0 002.15-2.71 9.86 9.86 0 01-3.13 1.2 4.92 4.92 0 00-8.39 4.48A13.94 13.94 0 011.64 3.16a4.92 4.92 0 001.52 6.56 4.86 4.86 0 01-2.23-.62v.06a4.93 4.93 0 003.94 4.83 4.9 4.9 0 01-2.21.08 4.92 4.92 0 004.6 3.42A9.87 9.87 0 010 21.54a13.94 13.94 0 007.55 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.01-.63a9.96 9.96 0 002.46-2.54"/>
                </svg>
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
