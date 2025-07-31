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


  // apiKey: "AIzaSyBdap4sE3BSIkVfUWn9pX2ifEe-30A9Up0",
  // authDomain: "campaigncompapp.firebaseapp.com",
  // projectId: "campaigncompapp",
  // storageBucket: "campaigncompapp.firebasestorage.app",
  // messagingSenderId: "40320070759",
  // appId: "1:40320070759:web:bd4de1101004f802b3d0c2",
  // measurementId: "G-XC38Z2D7W0"



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
  // apiKey:  `${process.env.REACT_APP_API_KEY}`,
  // authDomain:  `${process.env.REACT_APP_AUTH_DOMAIN}`,
  // projectId: `${process.env.REACT_APP_ID}`,
  // storageBucket:  `${process.env.REACT_APP_STORAGE_BUCKET}`,
  // messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  // appId: `${process.env.REACT_APP_APP_ID}`,
  // measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

console.log(firebaseConfig)

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth,db };

