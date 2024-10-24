import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db } from "./firebase.js"; // Import your Firebase config
import { setDoc, doc, getDoc } from "firebase/firestore";

// Sign Up function
export const signUp = async (email, password, companyName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await initUser(userCredential.user, companyName); // Initialize user in Firestore
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

// Sign Out function
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    alert("Signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

const initUser = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      companyName: companyName,
    });
  } catch (error) {
    console.error("Error initializing user:", error.message);
    throw error;
  }
};

export const addUserData = async (user, data) => {
  try {
    await setDoc(doc(db, "users", user.uid), data, { merge: true });
  } catch (error) {
    console.error("Error adding user data:", error.message);
    throw error;
  }
};

export const getUserData = async (user, key) => {
  try {
    // Reference the user's document using their UID
    const docRef = doc(db, "users", user.uid);
    // Get the document snapshot
    const docSnap = await getDoc(docRef);

    // Check if the document exists and return the data
    if (docSnap.exists()) {
      return docSnap.data()[key];
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.error("Error getting user data:", error.message);
    throw error;
  }
};

export const currentUser = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user); // Return the authenticated user object
      } else {
        reject("No user is logged in"); // Handle cases where the user is not logged in
      }
    });
  });
};
