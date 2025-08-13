// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://13.235.127.43:5000/api/register", {
        name,
        email,
        password,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* Left panel */}
      <div className="register-left">
        <div className="logo">Globe Hub</div>
        <h2>Welcome Back!</h2>
        <p>To keep connected with us please login with your personal info</p>
        <button className="sign-in-btn" onClick={() => navigate("/login")}>
          SIGN IN
        </button>
      </div>

      {/* Right panel */}
      <div className="register-right">
        <h2 className="register-title">Create Account</h2>
        <div className="social-icons">
          <button className="social-btn">f</button>
          <button className="social-btn">G+</button>
          <button className="social-btn">in</button>
        </div>
        <p className="or-text">or use your email for registration:</p>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && <div className="error">{error}</div>}

          <button className="sign-up-btn" type="submit" disabled={loading || showSuccess}>
            {loading ? "Creating..." : "SIGN UP"}
          </button>
          <button
            className="cancel-btn"
            type="button"
            onClick={() => navigate("/")}
          >
             CANCEL
          </button>

          
        </form>
      </div>
      
      {showSuccess && (
        <div className="success-modal">
          <div className="success-box">
            <div className="loader" />
            <div className="success-text">Account created successfully!</div>
          </div>
        </div>
      )}
    </div>
  );
} 