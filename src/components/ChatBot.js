import React, { useState, useContext, useEffect } from 'react';
import './ChatBot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '../firebase/config'; // Remove auth from import
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDlgO4qmQKWYiUbk90Cgy70k_Ubo6fJHtk");

// Custom prompts structure
const CUSTOM_PROMPTS = {
  initial_context: `You are an empathetic educational counselor who helps students dealing with academic stress and motivation issues. Your goal is to:
  - Show understanding and empathy
  - Ask open-ended questions to understand their situation better
  - Provide encouragement and practical support
  - Help students see their potential and worth
  - Guide them towards positive academic and personal growth
  - Never dismiss their feelings or concerns`,
  
  rules: [
    "Always respond with empathy and understanding",
    "Use a warm, friendly tone while maintaining professionalism",
    "Ask follow-up questions to better understand the situation",
    "Share specific strategies for academic success when relevant",
    "Validate their feelings before offering suggestions",
    "Never minimize their struggles or emotions",
    "Focus on their strengths and potential",
    "Encourage seeking professional help for serious concerns",
    "Maintain confidentiality and trust"
  ],

  examples: [
    {
      user: "I'm feeling kinda low today",
      bot: "Oh, that's sad to hear... can you tell me more about your day?"
    },
    {
      user: "I failed my math test. Maybe I should just quit.",
      bot: "I understand how disappointing that must feel. One test doesn't define your abilities though. Could you share what parts of math you're finding most challenging?"
    },
    {
      user: "Everyone else seems to get better grades without trying",
      bot: "It can be really frustrating when it feels that way. Remember that we all have different journeys and strengths. What subjects do you feel most confident in?"
    },
    {
      user: "I don't think college is for me",
      bot: "That sounds like a heavy thought to carry. Let's talk about what's making you feel this way. What specific challenges are you facing?"
    },
    {
      user: "I can't focus on studying",
      bot: "Many students struggle with focus - you're not alone. Would you like to explore some study techniques that might work better for your learning style?"
    }
  ]
};

const ChatBot = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [surveyData, setSurveyData] = useState(null);

  // Fetch survey data on component mount
  useEffect(() => {
    const fetchUserSurvey = async () => {
      if (!user) return;
      try {
        const surveyDoc = await getDoc(doc(db, 'userSurveys', user.uid));
        if (surveyDoc.exists()) {
          setSurveyData(surveyDoc.data());
        }
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };
    fetchUserSurvey();
  }, [user]);

  const generatePrompt = async (userMessage) => {
    const personalizedContext = surveyData ? `
    Based on your survey:
    - Academic Performance: ${surveyData.answers["academicPerformance"]}
    - Stress Level: ${surveyData.answers["stressLevel"]}
    - Support Needed: ${surveyData.answers["supportNeeded"]}
    - Education Level: ${surveyData.answers["educationLevel"]}
    ` : '';

    return `
      ${CUSTOM_PROMPTS.initial_context}
      
      ${personalizedContext}
      
      Rules to follow:
      ${CUSTOM_PROMPTS.rules.join('\n')}
      
      Previous examples:
      ${CUSTOM_PROMPTS.examples.map(ex => 
        `User: ${ex.user}\nAssistant: ${ex.bot}`
      ).join('\n\n')}
      
      Current conversation:
      User: ${userMessage}
      Assistant:`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Add user message
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      
      try {
        // Generate response using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = await generatePrompt(inputMessage);
        
        // Proper error handling for generation
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        if (response && response.text) {
          setMessages(prev => [...prev, {
            text: response.text(),
            sender: 'bot'
          }]);
        } else {
          throw new Error('Invalid response from API');
        }
        
      } catch (error) {
        console.error('Gemini API Error:', error);
        setMessages(prev => [...prev, {
          text: "I'm having trouble connecting. Please try again in a moment.",
          sender: 'bot'
        }]);
      }
      
      setInputMessage('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>AI Assistant</h2>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;