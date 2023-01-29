
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCAItQbsf20DFRJ5dzsnSK_nsC813rO6Lc",
  authDomain: "e-store-54fbc.firebaseapp.com",
  projectId: "e-store-54fbc",
  storageBucket: "e-store-54fbc.appspot.com",
  messagingSenderId: "471973557015",
  appId: "1:471973557015:web:aef6904a9ef8932a04fd52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;