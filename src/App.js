import React from "react";

import app from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { Routes, Route, Navigate } from "react-router-dom";
import LoadingIndicator from "./components/LoadingIndicator";
import LandingPage from "./pages/LandingPage/LandingPage";
import ChatRoom from "./components/Messaging/ChatRoom";

const auth = getAuth(app);
const db = getFirestore(app);
const firebaseContextValue = {
    auth: auth,
    db: db,
};
export const FirebaseContext = React.createContext(firebaseContextValue);

function App() {
    const [user, loading] = useAuthState(auth);

    let content;
    if (user) {
        content = (
            <>
                <h1>HueHue Success !</h1>
                <button onClick={() => signOut(auth)}>Logout</button>
            </>
        );
    }

    return (
        <FirebaseContext.Provider value={firebaseContextValue}>
            <LoadingIndicator isLoading={loading} />
            {!loading && (
                <Routes>
                    {!user && (
                        <Route path="/" element={<LandingPage auth={auth} />} />
                    )}
                    {user && (
                        <>
                            <Route path="/" element={<ChatRoom />} />
                        </>
                    )}
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            )}
        </FirebaseContext.Provider>
    );
}

export default App;
