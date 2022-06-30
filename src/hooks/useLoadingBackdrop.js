import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";

const useLoadingBackdrop = () => {
    const [loading, setLoading] = useState(false);

    const toggleLoading = () => {
        setLoading((oldValue) => !oldValue);
    };

    const setLoadingTrue = () => {
        setLoading(true);
    };

    const setLoadingFalse = () => {
        setLoading(false);
    };

    const LoadingScreen = () => {
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    };

    return {
        loading,
        toggleLoading,
        LoadingScreen,
        setLoadingTrue,
        setLoadingFalse,
    };
};

export default useLoadingBackdrop;
