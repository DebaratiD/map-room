import { getApp, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-6ynl2T8teOZpGuuWPvIkQY3VCOa-Lxw",
  authDomain: "maproom-31ba3.firebaseapp.com",
  projectId: "maproom-31ba3",
  storageBucket: "maproom-31ba3.firebasestorage.app",
  messagingSenderId: "359284725910",
  appId: "1:359284725910:web:c2d8f83fe991bfebdf0ab7",
  measurementId: "G-SF39F29ERN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes=>yes?getAnalytics(app):null);
const auth = getAuth(app);

export {app, analytics, auth};