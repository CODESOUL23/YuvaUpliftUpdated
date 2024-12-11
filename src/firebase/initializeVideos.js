// src/firebase/initializeVideos.js
import { db } from './config';
import { collection, addDoc } from 'firebase/firestore';

const videoData = [
  {
    title: "Overcome Academic Stress",
    url: "https://www.youtube.com/watch?v=c1aQZh5Q_YE",
    thumbnail: "https://img.youtube.com/vi/c1aQZh5Q_YE/maxresdefault.jpg"
  },
  {
    title: "Study Motivation", 
    url: "https://www.youtube.com/watch?v=RF5_wuZvJ88",
    thumbnail: "https://img.youtube.com/vi/RF5_wuZvJ88/maxresdefault.jpg"
  },
  {
    title: "Academic Excellence",
    url: "https://www.youtube.com/watch?v=3QRLyoYXgLY",
    thumbnail: "https://img.youtube.com/vi/3QRLyoYXgLY/maxresdefault.jpg"
  }
];

export const initializeVideosCollection = async () => {
  try {
    const videosRef = collection(db, 'motivationalVideos');
    
    // Add each video document
    for (const video of videoData) {
      await addDoc(videosRef, {
        ...video,
        createdAt: new Date()
      });
    }
    console.log('Videos collection initialized successfully');
  } catch (error) {
    console.error('Error initializing videos:', error);
  }
};