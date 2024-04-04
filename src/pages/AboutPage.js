import React from "react";
import image from "../images/pc.jpeg";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="aboutUs">
      <h1>About Us</h1>
      <img src={image} alt="Pomodoro Plus" width="220" height="220" />
      <p className="aboutUsp">
        Pomodoro Plus was created by our team to streamline the study
        experience. With elements such as personalized themes, colors, group
        study sessions, and a direct connection to Spotify, we want to ensure
        that you can achieve the optimal experience.
      </p>
    </div>
  );
};

export default AboutPage;
