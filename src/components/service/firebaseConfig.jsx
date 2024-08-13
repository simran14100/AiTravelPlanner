// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANTSwuSY7sm4Vbwe6Yo54ODeZh_r2Qkpw",
  authDomain: "tubegurur.firebaseapp.com",
  projectId: "tubegurur",
  storageBucket: "tubegurur.appspot.com",
  messagingSenderId: "883153646898",
  appId: "1:883153646898:web:12dbc381a83dd3ebe9932b",
  measurementId: "G-R2QDTVPK99"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
