import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA4buJ4ODh0dySbyd1nZ9gPIuQ9tl9kPrI",
    authDomain: "wiscord-v1.firebaseapp.com",
    projectId: "wiscord-v1",
    storageBucket: "wiscord-v1.appspot.com",
    messagingSenderId: "939880256673",
    appId: "1:939880256673:web:945247850cb8350ea20ce0",
    measurementId: "G-7S5ZVMBE94",
};

const app = initializeApp(firebaseConfig);

export default app;
