import * as firebase from "firebase";
import { toast } from "./toats";
import { resolve } from "dns";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) resolve(user);
      else resolve(null);
      unscribe();
    });
  });
}

export async function logoutUser() {
  return firebase.auth().signOut();
}

export async function loginUser(username: string, password: string): Promise<any> {
  const email = `${username}@codedamn.com`;
  // authenticate with firebase
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);

    // if present, show dashboard
    return res;
  } catch (error) {
    // if not, show error
    toast(error.message);
    return false;
  }
}

export async function registerUser(username: string, password: string) {
  const email = `${username}@codedamn.com`;
  // authenticate with firebase
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);

    // if present, show dashboard
    return true;
  } catch (error) {
    // if not, show error
    toast(error.message);
    return false;
  }
}
