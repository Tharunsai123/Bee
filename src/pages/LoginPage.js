import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css";
import beeAnimation from "../assets/bee-animation.mp4"; // Ensure the video is in the assets folder

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevents page refresh
    navigate("/home"); // Redirects to Home Page
  };

  return (
    <div className="login-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={beeAnimation} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login Box */}
      <div className="login-box">
        <h2>PROJECT B</h2>
        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          
          <div className="input-group">
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
