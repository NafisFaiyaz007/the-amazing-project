// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyCb4XHQiJKq5WOF-IIjCsZIpvg94B3NYiY",

  authDomain: "amazing-app-auth.firebaseapp.com",

  projectId: "amazing-app-auth",

  storageBucket: "amazing-app-auth.appspot.com",

  messagingSenderId: "952424963298",

  appId: "1:952424963298:web:9a128e8997f213f76452bb",

  measurementId: "G-C4DLV61PL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
