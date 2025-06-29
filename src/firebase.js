// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvrbxsrSTqCseptGIprWnBfsViu2vlZ3c",
  authDomain: "fleximy-web.firebaseapp.com",
  projectId: "fleximy-web",
  storageBucket: "fleximy-web.firebasestorage.app",
  messagingSenderId: "773393089268",
  appId: "1:773393089268:web:05ccc9f7304aae6be6d4a1",
  measurementId: "G-KSL34FH09C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Función para agregar suscripción a newsletter
export const addNewsletterSubscription = async (email) => {
  try {
    const docRef = await addDoc(collection(db, "newsletter_subscriptions"), {
      email: email,
      timestamp: serverTimestamp(),
      status: "active"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding newsletter subscription: ", error);
    return { success: false, error: error.message };
  }
};

export { app, analytics, db }; 