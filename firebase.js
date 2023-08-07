// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBRp8m8rIkxPaG9UK78lFFAmuP0CEkmSo",
  authDomain: "gomeal-70744.firebaseapp.com",
  projectId: "gomeal-70744",
  storageBucket: "gomeal-70744.appspot.com",
  messagingSenderId: "788645352727",
  appId: "1:788645352727:web:0cea82ff4cde06bc2a9352",
  measurementId: "G-XTYFKSPR0Q"
};

const initializeDb = initializeApp(firebaseConfig);
const firebase = getFirestore(initializeDb);

export {firebase, firebaseConfig };