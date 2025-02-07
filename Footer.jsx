import React from 'react'
import "../Footer/footer.css"
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          {/* Column 1: Social Links */}
          <Col md={4} sm={12} className="footer-column">
            <h5>Connect with Us</h5>
            <ul className="social-links">
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a></li>
            </ul>
          </Col>

          {/* Column 2: Contact Information */}
          <Col md={4} sm={12} className="footer-column">
            <h5>Contact Us</h5>
            <p>123 Trekking Lane</p>
            <p>Adventure City, AC 45678</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@trekkingcompany.com</p>
          </Col>

          {/* Column 3: Quick Links */}
          <Col md={4} sm={12} className="footer-column">
            <h5>Quick Links</h5>
            <ul className="quick-links">
              <li><a href="about-us">About Us</a></li>
              <li><a href="upcoming-treks">Upcoming Treks</a></li>
              <li><a href="top-treks">Top Treks</a></li>
              <li><a href="hiking-schools">Hiking Schools</a></li>
              <li><a href="articles">Articles</a></li>
              <li><a href="contact-us">Contact Us</a></li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Trekking Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
