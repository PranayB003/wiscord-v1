import React from "react";

import { app } from "./index";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { Routes, Route } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);

    let content;
    if (user) {
        content = (
            <>
                <h1>HueHue Success !</h1>
                <button onClick={() => signOut(auth)}>Logout</button>
            </>
        );
    } else {
        content = <LandingPage auth={auth} />;
    }

    return (
        <>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Routes>
                <Route path="/" element={content} />
            </Routes>
        </>
    );
}

export default App;
