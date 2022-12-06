// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMmnj9EKs-hEG4RkGVzRD-CUMZfb_MYNQ",
  authDomain: "amazing-app-370803.firebaseapp.com",
  projectId: "amazing-app-370803",
  storageBucket: "amazing-app-370803.appspot.com",
  messagingSenderId: "572807278348",
  appId: "1:572807278348:web:266cd9406cecf19b32e329"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);



