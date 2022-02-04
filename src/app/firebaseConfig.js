
import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, where, doc, getDocs, QuerySnapshot, query, getDoc, addDoc, setDoc, updateDoc, serverTimestamp, arrayUnion, onSnapshot, DocumentSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBXuIXprXvX0F7Unb2A07h3E3teTpfv_Qg",
  authDomain: "budgetary-accea.firebaseapp.com",
  projectId: "budgetary-accea",
  storageBucket: "budgetary-accea.appspot.com",
  messagingSenderId: "285501842805",
  appId: "1:285501842805:web:ee25babce8a6b92a3d5f3c",
  measurementId: "G-Y4KFL9WQM0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Analytics
export { analytics }

// Firestore database
export { db, collection, where, query, QuerySnapshot, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, serverTimestamp, arrayUnion, onSnapshot, DocumentSnapshot }

// Storage
export { storage }

// Authentication
export { auth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, }