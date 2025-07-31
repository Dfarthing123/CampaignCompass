import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


/* const firebaseConfig = {
  apiKey: process.env.apiKey, 
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId 
}; */


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdap4sE3BSIkVfUWn9pX2ifEe-30A9Up0",
  authDomain: "campaigncompapp.firebaseapp.com",
  projectId: "campaigncompapp",
  storageBucket: "campaigncompapp.firebasestorage.app",
  messagingSenderId: "40320070759",
  appId: "1:40320070759:web:bd4de1101004f802b3d0c2",
  measurementId: "G-XC38Z2D7W0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth,db };

