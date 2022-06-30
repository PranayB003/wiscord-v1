import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyA4buJ4ODh0dySbyd1nZ9gPIuQ9tl9kPrI",
    authDomain: "wiscord-v1.firebaseapp.com",
    projectId: "wiscord-v1",
    storageBucket: "wiscord-v1.appspot.com",
    messagingSenderId: "939880256673",
    appId: "1:939880256673:web:945247850cb8350ea20ce0",
    measurementId: "G-7S5ZVMBE94",
    // apiKey: "AIzaSyDQmbr6kPQaHcLBVAXW3DHL9-_55r67SgE",
    // authDomain: "lawyers-eu.firebaseapp.com",
    // projectId: "lawyers-eu",
    // storageBucket: "lawyers-eu.appspot.com",
    // messagingSenderId: "333899243296",
    // appId: "1:333899243296:web:95e466c9f3bb2c237a8145",
};

export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <StyledEngineProvider injectFirst>
                    <App />
                </StyledEngineProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
