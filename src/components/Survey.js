import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, database } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { AuthContext } from '../context/AuthContext';
import './Survey.css';

const Survey = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

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

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) throw new Error('Not authenticated');

      await Promise.all([
        setDoc(doc(db, 'surveys', user.uid), {
          answers,
          timestamp: new Date().toISOString(),
          userId: user.uid
        }),
        set(ref(database, `users/${user.uid}`), {
          educationLevel: answers.educationLevel,
          email: user.email
        })
      ]);

      navigate('/chat');
    } catch (error) {
      console.error('Error saving survey:', error);
      setError(error.message);
    }
  };

  return (
    <div className="survey-container">
      <h1>Initial Assessment</h1>
      <form onSubmit={handleSurveySubmit}>
        {error && <p className="error">{error}</p>}
        {questions.map((q) => (
          <div key={q.id} className="question-block">
            <h3>{q.text}</h3>
            <select 
              required
              onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
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
  );
};

export default Survey;