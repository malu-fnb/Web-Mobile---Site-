
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuzHwiIIfH8kjDOPJ1B6iQ_c8PwedqbFs",
  authDomain: "cine-webbb.firebaseapp.com",
  projectId: "cine-webbb",
  storageBucket: "cine-webbb.appspot.com",
  messagingSenderId: "629771110234",
  appId: "1:629771110234:web:72419cf2b4a889b6ed5563",
  measurementId: "G-0SC4TNELGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
