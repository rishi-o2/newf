// src/pages/HomePage.js
import React from "react";
import "./HomePage.css";
import img from "../images/logo.png";

const HomePage = () => {
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleSignupClick = () => {
    window.location.href = "/signup";
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1>Welcome to Our App</h1>
      <div className="button-group">
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleSignupClick}>Sign Up</button>
      </div>
    </div>
  );
};

export default HomePage;
