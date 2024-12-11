// src/components/TherapyPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TherapyPage.css';

const TherapyPage = () => {
  const navigate = useNavigate();

  const therapyServices = [
    {
      id: 1,
      title: "Pomodoro Timer",
      gradient: "linear-gradient(135deg, #1CB5E0, #000851)",
      link: "https://pomofocus.io" // Added link
    },
    {
      id: 2,
      title: "Breathing Exercise",
      gradient: "linear-gradient(135deg, #FF416C, #FF4B2B)",
      link: "https://www.calm.com/breathe" // Added link
    },
    {
      id: 3,
      title: "Mental Wellness",
      gradient: "linear-gradient(135deg, #7F00FF, #E100FF)"
    },
    {
      id: 4,
      title: "Peer Support",
      gradient: "linear-gradient(135deg, #00B4DB, #0083B0)"
    },
    {
      id: 5,
      title: "Family Counseling",
      gradient: "linear-gradient(135deg, #56ab2f, #a8e063)"
    },
    {
      id: 6,
      title: "Stress Management",
      gradient: "linear-gradient(135deg, #4776E6, #8E54E9)"
    },
    {
      id: 7,
      title: "Personal Development",
      gradient: "linear-gradient(135deg, #FF8008, #FFC837)"
    },
    {
      id: 8,
      title: "Crisis Support",
      gradient: "linear-gradient(135deg, #ee0979, #ff6a00)"
    }
  ];

  return (
    <div className="therapy-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h1>Therapy Services</h1>
      <div className="therapy-grid">
        {therapyServices.map((service) => (
          <a
            key={service.id}
            href={service.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="therapy-tile-link"
          >
            <div 
              className="therapy-tile"
              style={{ background: service.gradient }}
            >
              <h3>{service.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
 
};

export default TherapyPage;