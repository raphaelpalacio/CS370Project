import React, { useState } from 'react';
import './AboutPage.css'

const AboutPage = () => {
  // The initial profiles array with default information or empty strings
  const [profiles] = useState([
    { id: 1, 
     name: 'Alejandro Pacheco',
     hometown: 'Miami, FL', 
     major: 'Computer Science B.S. // Business Minor', 
     graduatingClass: 'Class of 2025',
     image: '/alejandro.jpg',
     linkedin: 'https://www.linkedin.com/in/alejandro-pacheco03/'
    },

    
    { id: 2, 
    name: 'Andrew Chang', 
    hometown: 'San Diego, CA',  
    major: 'Computer Science B.S.',
    graduatingClass: 'Class of 2026', 
    image: '/andrew.jpg',
    linkedin: 'https://www.linkedin.com/in/andrewchangsd'
    },

    { id: 3, 
      name: 'Raphael Palacio',
       hometown: 'Corning, NY',  
       major: 'Computer Science B.S.',
       graduatingClass: 'Class of 2025', 
       image: '/raphael.JPG',
       linkedin: 'https://www.linkedin.com/in/raphael-palacio-36a1801ab/'
    },
    { id: 4, 
      name: 'Jooha ',
       hometown: 'Madison, WI', 
       major: 'Quantitative Sience', 
       graduatingClass: 'Class of 2025', 
       image: '/jooha.jpg',
       linkedin: 'https://www.linkedin.com/in/jooha-lee-a51b30242/'
    },
    { id: 5, 
      name: 'Hamza',
       hometown: '', 
       major: 'Computer Science B.S.', 
       graduatingClass: 'Class of 2025', 
       image: '',
       linkedin: ''
    },
    { id: 6, 
      name: 'Shiv',
       hometown: 'West Windsor, NJ', 
       major: 'Computer Science B.S.', 
       graduatingClass: 'Class of 2025', 
       image: '/shiv.png',
       linkedin: 'https://www.linkedin.com/in/shivdesai02/'
    },
    { id: 7, 
      name: 'Riyaa',
       hometown: 'Computer Science B.S. and Business (Finance)', 
       major: ' ', 
       graduatingClass: 'Class of 2026', 
       image: '',
       linkedin: ''
    },
  ]);
  return (
    <section className="bg-white text-black">
      <div className="about-us-page">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About Pomodoro Plus
        </h1>
        <p className="text-md md:text-lg mb-6">
          Pomodoro Plus is dedicated to enhancing productivity and focus through
          the Pomodoro Technique. Our application helps users manage their time
          effectively, ensuring they can concentrate on work and take breaks
          systematically to boost overall efficiency and well-being.
        </p>
        <p className="text-md md:text-lg mb-6">
          Made in collaboration for CS370, our mission has been to provide a
          user-friendly platform that supports individuals in achieving their
          daily work and study goals. We believe in creating a balance between
          work and rest, enabling our users to achieve optimum performance
          without burnout.
        </p>
        <p className="text-md md:text-lg">
          We continually evolve our application based on user feedback and the
          latest research in productivity and time management.
        </p>

        {/* Profiles section */}
        <div className="profiles-container">
          {profiles.map(profile => (
            <div key={profile.id} className="profile-card">
              <img src={profile.image} alt={profile.name} className="profile-image"/>
              <h2>{profile.name}</h2>
              <p>Hometown: {profile.hometown}</p>
              <p>Major: {profile.major}</p>
              <p>Graduating Class: {profile.graduatingClass}</p>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
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
