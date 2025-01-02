// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a9d28.firebaseapp.com",
  projectId: "mern-auth-a9d28",
  storageBucket: "mern-auth-a9d28.firebasestorage.app",
  messagingSenderId: "258396712537",
  appId: "1:258396712537:web:63d3498371088acc008b48"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);