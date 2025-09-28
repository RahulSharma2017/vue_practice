// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByn0qTWYuebEmEIdsrs-IHP4ZL2P6u1GA",
  authDomain: "hatacha-670db.firebaseapp.com",
  projectId: "hatacha-670db",
  storageBucket: "hatacha-670db.firebasestorage.app",
  messagingSenderId: "291308678549",
  appId: "1:291308678549:web:a0b0855997ff8e7de0da9c",
  measurementId: "G-75KGJ94RKC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);