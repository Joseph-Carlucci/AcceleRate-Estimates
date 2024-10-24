import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase.js"; // Import your Firebase config
import { setDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { query, where } from "firebase/firestore"; // Add this import at the top of your file

function generateBase64Token(userId) {
  const encoded = Buffer.from(userId).toString("base64");
  return encoded;
}

// Sign Up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await initUser(userCredential.user); // Initialize user in Firestore
    addUserData(userCredential.user, {
      customLinkToken: generateBase64Token(userCredential.user.uid),
    });
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
    await setDoc(doc(db, "users", user.uid), data, { merge: true });
  } catch (error) {
    console.error("Error adding user data:", error.message);
    throw error;
  }
};

export const getUserData = async (key) => {
  try {
    const user = await currentUser();

    if (!key) {
      throw new Error("A valid key must be provided.");
    }

    // Reference the user's document using their UID
    console.log("Getting user data for UID:", user.uid);
    const docRef = doc(db, "users", user.uid);
    // Get the document snapshot
    const docSnap = await getDoc(docRef);

    // Check if the document exists and return the data
    if (docSnap.exists()) {
      const data = docSnap.data();

      // Check if the key exists within the document
      if (key in data) {
        return data[key];
      } else {
        console.warn(`Key '${key}' does not exist in the user document.`);
        return undefined;
      }
    } else {
      console.warn("No such document exists for user:", user.uid);
      return undefined;
    }
  } catch (error) {
    console.error(
      `Error getting user data for UID '${user?.uid}':`,
      error.message
    );
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

export const getServiceDataByToken = async (token) => {
  try {
    token = decodeURIComponent(token); // Decode the token
    console.log("Querying user by token:", token); // Log token being queried
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("customLinkToken", "==", token));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No user found with the provided token");
    }

    const user = querySnapshot.docs[0];
    console.log("User found:", user.data().name);
    return user.data().name;
  } catch (error) {
    console.error("Error getting user data by token:", error.message);
    throw error;
  }
};

export const fetchTokens = async () => {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef); // Await the async call
    const tokens = [];

    // Iterate over the documents using the `.docs` array
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.customLinkToken) {
        tokens.push({ token: data.customLinkToken });
      }
    });

    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error.message);
    throw error;
  }
};
