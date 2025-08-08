import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/places');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page-root">
      {/* NAV */}
      <header className="topbar">
        <div className="brand">Globe Hub</div>

        <nav className="main-nav">
          <a href="#gallery">GALLERY</a>
          <a href="#service">SERVICE</a>
          <a href="#about">ABOUT</a>
          <Link to="/contact">CONTACT</Link>
        </nav>

        <div className="search-area">
          <input className="search-input" placeholder="Type to search" />
          <button className="search-btn">Search</button>
        </div>
      </header>

      {/* HERO + CARD */}
      <main className="hero-wrap">
        <section className="hero-left">
          <h1 className="hero-title">
            <span className="hero-big">BEST PLACE</span><br />
            <span className="hero-find">TO FIND</span>
          </h1>
          <p className="hero-sub">
            AND EXPLORE<br />THAT ALL YOU NEED
          </p>
          <button className="cta">JOIN US</button>
        </section>

        <aside className="login-column">
          <div className="login-card">
            <div className="login-title">Login Here</div>

            <form onSubmit={handleLogin} className="login-form">
              <label className="label">Enter Email Here</label>
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <label className="label">Enter Password Here</label>
              <input
                type="password"
                className="login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              {error && <div className="error-text">{error}</div>}

              <button className="login-btn" type="submit">Login</button>
            </form>

            <div className="signup-row">
              <div>Don't have an account?</div>
              <Link to="/register" className="signup-link">Sign up here</Link>
            </div>

            <div className="social-icons">
              <FaFacebook className="social-icon fb" />
              <FaInstagram className="social-icon ig" />
              <FaTwitter className="social-icon tw" />
              <FaGoogle className="social-icon gg" />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
