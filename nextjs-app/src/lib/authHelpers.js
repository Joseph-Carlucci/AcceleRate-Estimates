import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase.js"; // Import your Firebase config
import { setDoc } from "firebase/firestore";

// Sign Up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    initUser(userCredential.user); // Initialize user in Firestore
    return userCredential.user; // User details on successful sign-up
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Sign In function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // User details on successful sign-in
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

const initUser = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
    });
  } catch (error) {
    console.error("Error initializing user:", error.message);
    throw error;
  }
};

export const addUserData = async (user, data) => {
  try {
    await setDoc(doc(db, "users", user.uid), data);
  } catch (error) {
    console.error("Error adding user data:", error.message);
    throw error;
  }
};
