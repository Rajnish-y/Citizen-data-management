import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnCFULNP_Y4X-qdOeNxbBDQlgfhcGKT_s",
  authDomain: "smartcities-123.firebaseapp.com",
  projectId: "smartcities-123",
  storageBucket: "smartcities-123.firebasestorage.app",
  messagingSenderId: "529669173277",
  appId: "1:529669173277:web:48fc70f7a690f8ad0156f4",
  measurementId: "G-SGJ0NJXYHS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
