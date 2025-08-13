import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/Contactpage.css";

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !message) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://13.235.127.43:5000/api/contact', {
        name,
        email,
        message
      });
      alert('Message sent successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-main">
        <h2>Contact Us</h2>
        <p>Any questions or remarks? Just write us a message!</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter a valid email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          ></textarea>
          {error && <div className="error-text">{error}</div>}
          <button type="submit">SUBMIT</button>
        </form>
      </div>

      {/* === Updated Footer === */}
      <footer className="footer">
        <div className="footer-box">
          <div className="footer-icon">🏃‍♂️</div>
          <h4>ABOUT CLUB</h4>
          <p>Running Guide<br />Workouts</p>
        </div>
        <div className="footer-box">
          <div className="footer-icon">📞</div>
          <h4>PHONE (LANDLINE)</h4>
          <p>+94 076 - 3032542<br />+94 078  3626874</p>
        </div>
        <div className="footer-box">
          <div className="footer-icon">📍</div>
          <h4>OUR OFFICE LOCATION</h4>
          <p>
            The Globe Hub<br />
            The Courtyard, Al Quoz 1, Colorado, USA
          </p>
        </div>
      </footer>
    </div>
  );
}
