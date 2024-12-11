import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Survey from './components/Survey';
import ChatBot from './components/ChatBot';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import CommunityChat from './components/CommunityChat';
import MotivationalVideos from './components/MotivationalVideos';
import { initializeVideosCollection } from './firebase/initializeVideos';
import { useEffect } from 'react';
import TherapyPage from './components/TherapyPage';
import Educational from './components/Educational'; // Add this import

function App() {
  useEffect(() => {
    initializeVideosCollection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/survey" element={<PrivateRoute><Survey /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><ChatBot /></PrivateRoute>} />
            <Route path="/community" element={<PrivateRoute><CommunityChat /></PrivateRoute>} />
            <Route path="/motivation" element={<PrivateRoute><MotivationalVideos /></PrivateRoute>} />
            <Route path="/therapy" element={<PrivateRoute><TherapyPage /></PrivateRoute>} />
            <Route path="/educational" element={<PrivateRoute><Educational /></PrivateRoute>} /> {/* Add this route */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
