// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "tect-blog.firebaseapp.com",
    projectId: "tect-blog",
    storageBucket: "tect-blog.appspot.com",
    messagingSenderId: "741809300960",
    appId: "1:741809300960:web:8d0ffb4b5e2ad5e5e6f785"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);