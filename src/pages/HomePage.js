import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="home-container-left">
        <h1>Ditch the Guilt, Not the Group Chat</h1>
        <p>A study and work application that supports all of your Pomodoro  needs. Get work done in focused bursts and reward yourself with micro-hangouts with friends.</p>
      </div>
      <div className="home-container-right">
        <img src="featureImage.png" alt="Feature Image" />
      </div>
    </div>
  );
};

export default HomePage;
