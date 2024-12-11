import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [quote, setQuote] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const emojis = {
    '😊': 'Happy',
    '😔': 'Sad',
    '😫': 'Stressed',
    '😴': 'Tired',
    '🤔': 'Confused'
  };

  const quotes = {
    'Happy': "Keep spreading your positive energy!",
    'Sad': "Every storm runs out of rain. Better days are coming!",
    'Stressed': "Take a deep breath. You've got this!",
    'Tired': "Rest when you need to. Self-care is important.",
    'Confused': "It's okay to ask for help. That's what we're here for!"
  };

  const handleEmojiClick = (mood) => {
    setSelectedEmoji(mood);
    setQuote(quotes[emojis[mood]]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowProfile(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">YuwaUplift</div>
        <div className="nav-links">
          {!user ? (
            <button onClick={() => navigate('/login')}>Login</button>
          ) : (
            <>
              <button onClick={() => setShowProfile(true)}>Profile</button>
              <button onClick={() => navigate('/community')}>Chat Community</button>
              <button onClick={() => navigate('/chat')}>AI Assistant</button>
              <button onClick={() => navigate('/motivation')}>Motivational Videos</button>
              <button onClick={() => navigate('/therapy')}>Therapy</button>
              <button onClick={() => navigate('/educational')}>Educational</button> {/* Add this button */}
            </>
          )}
        </div>
      </nav>

      {showProfile && user && (
        <div className="profile-overlay">
          <div className="profile-popup">
            <h2>Profile</h2>
            <div className="profile-info">
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button className="close-btn" onClick={() => setShowProfile(false)}>
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="hero-section">
        <h1>How are you feeling today?</h1>
        <div className="emoji-container">
          {Object.keys(emojis).map(emoji => (
            <span 
              key={emoji} 
              onClick={() => handleEmojiClick(emoji)}
              className={`emoji ${selectedEmoji === emoji ? 'selected' : ''}`}
            >
              {emoji}
            </span>
          ))}
        </div>
        {quote && <div className="quote">{quote}</div>}
      </div>

      <div className="features-section">
        <h2>We're Here to Support You</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Community Support</h3>
            <p>Connect with peers who understand your journey</p>
          </div>
          <div className="feature-card">
            <h3>AI Assistant</h3>
            <p>24/7 guidance and support when you need it</p>
          </div>
          <div className="feature-card">
            <h3>Professional Help</h3>
            <p>Access to resources and professional guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;