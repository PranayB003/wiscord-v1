import React, { useState } from "react";

import {
    Box,
    Stack,
    Button,
    Collapse,
    Alert,
    CircularProgress,
} from "@mui/material";
import OTPInput from "./OTPInput";
import getFirebaseErrorMessage from "../../utils/getFirebaseErrorMessage";

const OTPForm = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState({ state: false, message: "" });
    const [loading, setLoading] = useState(false);

    const confirmHandler = async () => {
        setLoading(true);
        try {
            await window.confirmationResult.confirm(otp);
        } catch (err) {
            console.error(err);
            let message = getFirebaseErrorMessage(err);
            setError({ state: true, message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack spacing={2}>
            <Collapse in={error.state}>
                <Alert
                    severity="error"
                    onClose={() => setError({ state: false, message: "" })}
                >
                    {error.message}
                </Alert>
            </Collapse>
            <OTPInput getValue={setOtp} />
            <Box sx={{ position: "relative" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    disabled={otp.length !== 6 || loading}
                    onClick={confirmHandler}
                >
                    Confirm
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                        }}
                    />
                )}
            </Box>
        </Stack>
    );
};

export default OTPForm;
