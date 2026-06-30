// Firebase initialization scaffold
// Replace the config object with your Firebase project's credentials.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBqyElx_7QdlhXEbuS5B9XhA82SxZ_APFs",
  authDomain: "dj-chrome.firebaseapp.com",
  projectId: "dj-chrome",
  storageBucket: "dj-chrome.firebasestorage.app",
  messagingSenderId: "1062056802546",
  appId: "1:1062056802546:web:824381b22c140ca7c0b86b",
  measurementId: "G-3XCXNSFEGF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
