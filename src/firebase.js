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
  apiKey: "AIzaSyAWjxUQ5nauj9lCAP1cwD6miDrexZQUlmo",
  authDomain: "test-367422.firebaseapp.com",
  projectId: "test-367422",
  storageBucket: "test-367422.appspot.com",
  messagingSenderId: "860291470589",
  appId: "1:860291470589:web:a8e5b2e2d8856ddb2c9a94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


