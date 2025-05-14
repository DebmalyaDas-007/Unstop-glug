// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "unstop-47fdc.firebaseapp.com",
  projectId: "unstop-47fdc",
  storageBucket: "unstop-47fdc.firebasestorage.app",
  messagingSenderId: "442508927801",
  appId: "1:442508927801:web:a528f673d405b77a35fee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };