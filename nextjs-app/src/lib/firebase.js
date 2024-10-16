import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3SA6tAT2symikGnc6JwnMkwIj6Jdb1F4",
  authDomain: "accelerate-d74fd.firebaseapp.com",
  projectId: "accelerate-d74fd",
  storageBucket: "accelerate-d74fd.appspot.com",
  messagingSenderId: "112718686116",
  appId: "1:112718686116:web:d5d126584e6764057b0331",
  measurementId: "G-1CTKQ3X3M3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
