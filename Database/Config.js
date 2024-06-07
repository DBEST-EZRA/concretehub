import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChKYBll1qysNS6k6Nv6cKOB-cupEhfvlQ",
  authDomain: "concretehub-328a7.firebaseapp.com",
  projectId: "concretehub-328a7",
  storageBucket: "concretehub-328a7.appspot.com",
  messagingSenderId: "558899913278",
  appId: "1:558899913278:web:400c136ee7b7296956a76f",
  measurementId: "G-LGWB0807M2",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
};
