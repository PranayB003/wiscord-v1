import React from "react";

import app from "./firebase";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

import { Routes, Route, Navigate } from "react-router-dom";
import FullscreenCircularLoadingIndicator from "./components/FullscreenCircularLoadingIndicator";
import LandingPage from "./pages/LandingPage/LandingPage";
import WrapperPage from "./pages/WrapperPage";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const firebaseContextValue = {
    auth,
    db,
    storage,
};
export const FirebaseContext = React.createContext(firebaseContextValue);

function App() {
    const [user, loading] = useAuthState(auth);

    return (
        <FirebaseContext.Provider value={firebaseContextValue}>
            {loading && (
                <FullscreenCircularLoadingIndicator isLoading={loading} />
            )}
            {!loading && (
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<WrapperPage />} />
                        </>
                    ) : (
                        <Route path="/" element={<LandingPage auth={auth} />} />
                    )}
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            )}
        </FirebaseContext.Provider>
    );
}

export default App;
