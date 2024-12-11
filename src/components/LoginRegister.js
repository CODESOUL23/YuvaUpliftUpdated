import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database'; // Import 'set' from firebase/database
import { auth, db, database } from '../firebase/config';
import './LoginRegister.css';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else {
        // Create user and automatically sign them in
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // No need to manually sign in since createUserWithEmailAndPassword does it automatically
        setShowSurvey(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('No authenticated user');

      const educationLevel = surveyAnswers["What is your current education level?"];
      
      await Promise.all([
        setDoc(doc(db, 'userSurveys', userId), {
          answers: surveyAnswers,
          timestamp: new Date().toISOString(),
          userId: userId,
          educationLevel: educationLevel
        }),
        set(ref(database, `users/${userId}`), {
          educationLevel: educationLevel,
          email: auth.currentUser.email
        })
      ]);

      navigate('/', { replace: true });
    } catch (error) {
      console.error('Survey submission error:', error);
      setError(error.message || 'Failed to submit survey');
    }
  };

  const surveyQuestions = [
    "How's your college life going?",
    "How have you been feeling lately?",
    "Have you spoken about your feelings with someone else?",
    "Are you satisfied with your academic performance?",
    "Do you feel supported by your college community?",
    "What is your current education level?" // New question
  ];

  // Update education level options
  const educationLevels = [
    "Middle School",
    "High School",
    "Freshman Year",
    "Sophomore Year", 
    "Pre Final Year",
    "Final Year",
    "Post Graduation"
  ];

  return (
    <div className="auth-container">
      {!showSurvey ? (
        <div className="auth-form">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {!isLogin && (
              <input 
                type="password" 
                placeholder="Confirm Password"
                required 
              />
            )}
            <button type="submit">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </p>
        </div>
      ) : (
        <div className="survey-form">
          <h2>Quick Survey</h2>
          <form onSubmit={handleSurveySubmit}>
            {surveyQuestions.map((question, index) => (
              <div key={index} className="survey-question">
                <label>{question}</label>
                {question === "What is your current education level?" && (
                  <select 
                    required
                    onChange={(e) => setSurveyAnswers(prev => ({
                      ...prev,
                      [question]: educationLevels[parseInt(e.target.value)]
                    }))}
                  >
                    <option value="">Select your education level</option>
                    {educationLevels.map((level, index) => (
                      <option key={level} value={index}>
                        {level}
                      </option>
                    ))}
                  </select>
                )}
                {question !== "What is your current education level?" && (
                  <select 
                    required
                    onChange={(e) => setSurveyAnswers(prev => ({
                      ...prev,
                      [question]: e.target.value
                    }))}
                  >
                    <option value="">Select an answer</option>
                    {["Very Poor", "Poor", "Neutral", "Good", "Excellent"].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            <button type="submit">Complete Registration</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;