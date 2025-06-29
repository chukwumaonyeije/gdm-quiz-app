// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC50NmIJECWpNlHsvfaWK3K_wFfL--9b-I",
  authDomain: "gdm-quiz-app.firebaseapp.com",
  projectId: "gdm-quiz-app",
  storageBucket: "gdm-quiz-app.firebasestorage.app",
  messagingSenderId: "1087857340628",
  appId: "1:1087857340628:web:20319727d4e4ff5ca34b41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);