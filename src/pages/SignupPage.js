import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/SignupPage.css";
import beeAnimation from "../assets/bee-animation.mp4"; // Background video

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={beeAnimation} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Signup Box */}
      <div className="signup-box">
        <h2>Create an Account</h2>
        <form>
          <div className="input-group">
            <label>Full Name:</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" placeholder="Choose a username" required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" placeholder="Create a password" required />
          </div>
          <div className="input-group">
            <label>Confirm Password:</label>
            <input type="password" placeholder="Confirm your password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
      </div>
    </div>
  );
};

export default SignupPage;
