import React, { useState } from "react";
import "./AboutPage.css";

const AboutPage = () => {
  // The initial profiles array with default information or empty strings
  const [profiles] = useState([
    {
      id: 1,
      name: "Alejandro Pacheco",
      hometown: "Miami, FL",
      major: "Computer Science B.A.",
      graduatingClass: "Class of 2025",
      image: "/alejandro.jpg",
      linkedin: "https://www.linkedin.com/in/alejandro-pacheco03/",
    },

    {
      id: 2,
      name: "Andrew Chang",
      hometown: "San Diego, CA",
      major: "Computer Science B.S.",
      graduatingClass: "Class of 2026",
      image: "/andrew.jpg",
      linkedin: "https://www.linkedin.com/in/andrewchangsd",
    },

    {
      id: 3,
      name: "Raphael Palacio",
      hometown: "Corning, NY",
      major: "Computer Science B.S.",
      graduatingClass: "Class of 2025",
      image: "/raphael.JPG",
      linkedin: "https://www.linkedin.com/in/raphael-palacio-36a1801ab/",
    },
    {
      id: 4,
      name: "Jooha Lee",
      hometown: "Madison, WI",
      major: "Quantitative Sience B.S",
      graduatingClass: "Class of 2025",
      image: "/jooha.jpg",
      linkedin: "https://www.linkedin.com/in/jooha-lee-a51b30242/",
    },
    {
      id: 5,
      name: "Hamza Alkadir",
      hometown: "High Point, NC",
      major: "Computer Science B.S.",
      graduatingClass: "Class of 2025",
      image: "/hamza.JPG",
      linkedin: "https://www.linkedin.com/in/hamza-alkadir-1aa15a2a2/",
    },
    {
      id: 6,
      name: "Shiv Desai",
      hometown: "West Windsor, NJ",
      major: "Computer Science B.S.",
      graduatingClass: "Class of 2025",
      image: "/shiv.png",
      linkedin: "https://www.linkedin.com/in/shivdesai02/",
    },
    {
      id: 7,
      name: "Riyaa",
      hometown: "Campbell, CA ",
      major: "Computer Science B.S. and Business Administration",
      graduatingClass: "Class of 2026",
      image: "/riyaa.png",
      linkedin: "https://www.linkedin.com/in/riyaarandhawa/",
    },
  ]);
  return (
    <section className="bg-white text-black">
      <div className="about-us-page mx-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About Pomodoro Plus
        </h1>
        <p className="text-md md:text-lg mb-6">
          Pomodoro Plus is dedicated to enhancing productivity and focus through the Pomodoro Technique. 
          Our application helps users manage their time effectively, 
          ensuring they can concentrate on work and take breaks systematically to avoid
        </p>
        <p className="text-md md:text-lg mb-6">
          For CS370, our goal was to develop an innovative web application is to provide a simple and intuitive interface for users to manage their time effectively;
          allowing our users to focus on what really matters - time with loved ones, hobbies, and personal growth.
        </p>
        

        {/* Profiles section */}
        <div className="profiles-container">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              {/* Image container to enforce the circular shape */}
              <div className="profile-image-container">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="profile-image"
                />
              </div>
              <div className="profile-name">{profile.name}</div>
              <p>Hometown: {profile.hometown}</p>
              <p>Major: {profile.major}</p>
              <p>Graduating Class: {profile.graduatingClass}</p>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link"
                >
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
