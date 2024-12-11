// src/components/CommunityChat.js
import React, { useEffect, useState, useRef } from 'react';
import { auth, database } from '../firebase/config';
import { ref, onValue, push } from 'firebase/database';
import './CommunityChat.css';

const CommunityChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userEducationLevel, setUserEducationLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!auth.currentUser) return;
    
    try {
      const userRef = ref(database, `users/${auth.currentUser.uid}`);
      const unsubscribeUser = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (!data?.educationLevel) {
          setError("Education level not found");
          return;
        }
        setUserEducationLevel(data.educationLevel);
      });

      return () => unsubscribeUser();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Listen for messages
    const messagesRef = ref(database, `messages/${userEducationLevel}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setMessages(messageList);
        scrollToBottom();
      }
    });
  }, [userEducationLevel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messagesRef = ref(database, `messages/${userEducationLevel}`);
    push(messagesRef, {
      text: newMessage,
      userId: auth.currentUser.uid,
      username: auth.currentUser.email,
      timestamp: Date.now()
    });

    setNewMessage('');
  };

  // Add error and loading states to UI
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userEducationLevel) return <div>Education level not set</div>;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{userEducationLevel} Community</h2>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`message ${message.userId === auth.currentUser.uid ? 'own-message' : ''}`}
          >
            <div className="message-header">
              <span className="username">{message.username}</span>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CommunityChat;