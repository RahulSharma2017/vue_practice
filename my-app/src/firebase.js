// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsDINm_zAc_oNiP_3NAU3rkdbarHSqLP8",
  authDomain: "hatacha-abf0b.firebaseapp.com",
  databaseURL: "https://hatacha-abf0b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hatacha-abf0b",
  storageBucket: "hatacha-abf0b.firebasestorage.app",
  messagingSenderId: "234866526571",
  appId: "1:234866526571:web:50b161863323a0bf27642e",
  measurementId: "G-V4N5T8N2XE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);