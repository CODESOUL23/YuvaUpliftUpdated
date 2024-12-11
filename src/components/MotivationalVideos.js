// src/components/MotivationalVideos.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MotivationalVideos.css';

const MotivationalVideos = () => {
  const [videos] = useState([
    {
        id: '1',
        title: "Study Motivation",
        videoId: "RwxC5J8LI4Q",
        duration: "1:15"
    },
    {
        id: '2',
        title: "Focus Power",
        videoId: "FhG-VoRtkKY",
        duration: "1:45"
    },
    {
        id: '3',
        title: "Academic Success",
        videoId: "M5QgXy3uDpo",
        duration: "1:30"
    },
    {
        id: '4',
        title: "Student Life",
        videoId: "dx3jb6Yx6wU",
        duration: "1:50"
    },
    {
        id: '5',
        title: "Never Give Up",
        videoId: "K3eEqD7JZKE",
        duration: "1:20"
    },
    {
        id: '6',
        title: "Study Goals",
        videoId: "tYzCxCEb9vA",
        duration: "1:30"
    },
    {
        id: '7',
        title: "Focus Time",
        videoId: "5ZT6lupGUaE",
        duration: "1:25"
    },
    {
        id: '8',
        title: "Success Path",
        videoId: "pyBXB5GHcO0",
        duration: "1:40"
    },
    {
        id: '9',
        title: "Study Smart",
        videoId: "9fLlkOMrMq4",
        duration: "1:20"
    },
    {
        id: '10',
        title: "Academic Journey",
        videoId: "HpJ3niCu_rQ",
        duration: "1:35"
    }
  ]);

  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target.querySelector('iframe');
          iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
        }
      });
    }, options);

    videos.forEach((video) => {
      if (videoRefs.current[video.id]) {
        observer.observe(videoRefs.current[video.id]);
      }
    });

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div className="videos-container" ref={containerRef}>
      <h1>Motivational Videos</h1>
      <button 
        className="back-button" 
        onClick={() => navigate('/')}
      >
        ← Back
      </button>
      <div className="video-scroll">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="video-card"
            ref={el => videoRefs.current[video.id] = el}
          >
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&mute=1&controls=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationalVideos;