// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAO6FkzpAxnaPBpQkUbRXwfaU10od-ZheM",
  authDomain: "prototypesih.firebaseapp.com",
  databaseURL: "https://prototypesih-default-rtdb.asia-southeast1.firebasedatabase.app", // Add this line
  projectId: "prototypesih",
  storageBucket: "prototypesih.appspot.com",
  messagingSenderId: "10928018446",
  appId: "1:10928018446:web:95ed9c3d0e4c75173d585f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);

// Set persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });