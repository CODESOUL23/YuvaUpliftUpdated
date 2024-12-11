import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { auth, db, database } from '../firebase/config';
import './Signup.css';
import bg from '../assets/bg.png';
import invertedCommas from '../assets/inverted_commas.png';
import showIcon from '../assets/show.png';
import hideIcon from '../assets/hide.png';
import userPlaceholder from '../assets/user.png';

function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formError, setFormError] = useState('');
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(userPlaceholder);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState({});

  const quotes = [
    "It’s not whether you get knocked down, it’s whether you get back up.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "It does not matter how slowly you go, as long as you do not stop.",
    "You don’t have to be great to start, but you have to start to be great.",
    "Tell me and I forget, teach me and I may remember, involve me and I learn.",
  ];
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const previewProfilePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePicture(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const questions = [
    {
      id: "academicPerformance",
      text: "How satisfied are you with your academic performance?",
      options: ["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"]
    },
    {
      id: "stressLevel", 
      text: "How would you rate your current stress level?",
      options: ["Very High", "High", "Moderate", "Low", "Very Low"]
    },
    {
      id: "supportNeeded",
      text: "What type of support do you need most?",
      options: ["Academic", "Emotional", "Career Guidance", "Time Management", "Other"]
    },
    {
      id: "educationLevel",
      text: "What is your current education level?",
      options: [
        "Middle School",
        "High School", 
        "Freshman Year",
        "Sophomore Year",
        "Pre Final Year", 
        "Final Year",
        "Post Graduation"
      ]
    }
  ];

  const validateForm = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      await Promise.all([
        setDoc(doc(db, 'users', userId), {
          email,
          createdAt: new Date().toISOString()
        }),
        set(ref(database, `users/${userId}`), {
          email,
          profilePicture: profilePicture
        })
      ]);

      setShowSurvey(true); // Show survey after successful signup

    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('No authenticated user');

      const educationLevel = surveyAnswers.educationLevel;
      
      // Store full survey data
      await setDoc(doc(db, 'userSurveys', userId), {
        answers: surveyAnswers,  // This contains all survey answers with correct IDs
        timestamp: new Date().toISOString(),
        userId: userId
      });

      // Store education level separately for community chat
      await set(ref(database, `users/${userId}`), {
        educationLevel: educationLevel,
        email: auth.currentUser.email
      });

      setIsPageHidden(true);
      setTimeout(() => {
        navigate('/');
      }, 500);

    } catch (error) {
      setFormError(error.message);
    }
  };

  const navigateToLogin = () => {
    setIsPageHidden(true);
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div
      className={`signup-container ${isPageHidden ? 'hidden' : ''}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      {!showSurvey ? (
        <div className="signup-box">
          <div className="signup-left">
            <h2>Create an Account</h2>
            <div className="profile-image-container">
              <img id="profile-pic" src={profilePicture} alt="User Avatar" />
              <label htmlFor="profile-pic-input" className="profile-pic-label">
                Add a Profile Picture
              </label>
              <input
                type="file"
                id="profile-pic-input"
                style={{ display: 'none' }}
                onChange={previewProfilePicture}
              />
            </div>
            <div className="form-box">
              <form id="signup-form" onSubmit={validateForm}>
                <div className="form-row">
                  <div className='first'>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" placeholder="First Name" required/>
                  </div>
                  <div className='last'>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" placeholder="Last Name" required/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" placeholder="Username" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group password-container">
                  <label htmlFor="password">Password</label>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <img
                    src={passwordVisible ? hideIcon : showIcon}
                    alt="Toggle Password Visibility"
                    className="toggle-password"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                </div>
                <div className="form-group password-container">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <img
                    src={confirmPasswordVisible ? hideIcon : showIcon}
                    alt="Toggle Password Visibility"
                    className="toggle-password"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  />
                </div>
                {formError && <div className="error-message">{formError}</div>}
                <div className="form-group">
                  <button type="submit" className="signup-button">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="signup-right">
            <div className="quotes-container">
              <div className="quotes">
                <img src={invertedCommas} alt="Quote Icon" className="quote-icon" />
                <p id="quote">{quotes[currentQuote]}</p>
              </div>
              <div className="login-link">
                <p>Already have an account? <a href="/login">Login</a></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="survey-container">
          <h1>Initial Assessment</h1>
          <form onSubmit={handleSurveySubmit}>
            {formError && <div className="error-message">{formError}</div>}
            {questions.map((q) => (
              <div key={q.id} className="question-block">
                <h3>{q.text}</h3>
                <select 
                  required
                  onChange={(e) => setSurveyAnswers({
                    ...surveyAnswers, 
                    [q.id]: e.target.value
                  })}
                >
                  <option value="">Select an answer</option>
                  {q.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
            <button type="submit">Complete Survey</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
