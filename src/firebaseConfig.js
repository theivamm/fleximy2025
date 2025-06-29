// src/firebaseConfig.js

// Importamos las funciones necesarias
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase que obtuviste de la consola
const firebaseConfig = {
    apiKey: "AIzaSyAvrbxsrSTqCseptGIprWnBfsViu2vlZ3c",
    authDomain: "fleximy-web.firebaseapp.com",
    projectId: "fleximy-web",
    storageBucket: "fleximy-web.appspot.com",
    messagingSenderId: "773393089268",
    appId: "1:773393089268:web:05ccc9f7304aae6be6d4a1",
    measurementId: "G-KSL34FH09C"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos y exportamos Firestore, tu base de datos
export const db = getFirestore(app);