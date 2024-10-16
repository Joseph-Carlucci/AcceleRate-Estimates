import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";  // Import your Firebase config

// Sign Up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;  // User details on successful sign-up
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Sign In function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;  // User details on successful sign-in
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};
