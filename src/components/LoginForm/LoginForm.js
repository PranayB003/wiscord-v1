/* global grecaptcha */
import React, { useCallback, useState } from "react";

import {
    Stack,
    TextField,
    InputAdornment,
    InputBase,
    Button,
    Collapse,
    Alert,
} from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import useLoadingBackdrop from "../../hooks/useLoadingBackdrop";

const LoginForm = ({ auth, setData }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("91");
    const [error, setError] = useState({ state: false, message: "" });
    const [boxKey, setBoxKey] = useState(0);
    const { toggleLoading, LoadingScreen } = useLoadingBackdrop();

    const setRecaptchaVerifier = useCallback(
        (element) => {
            if (!element) return;
            window.recaptchaVerifier = new RecaptchaVerifier(
                element,
                {
                    size: "invisible",
                },
                auth
            );
        },
        [auth]
    );

    const onMobileSubmit = () => {
        const data = "+" + countryCode.trim() + phoneNumber.trim();
        toggleLoading();
        signInWithPhoneNumber(auth, data, window.recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toggleLoading();
                setData(data);
            })
            .catch((error) => {
                console.error(error);
                if (error.message.match("(auth/invalid-phone-number)")) {
                    // invalid phone number
                    setError({ state: true, message: "Invalid phone number." });
                } else if (error.message.match("(auth/too-many-requests)")) {
                    setError({
                        state: true,
                        message: "Too many requests, please try again later.",
                    });
                } else {
                    setError({
                        state: true,
                        message: "Something went wrong, please try again.",
                    });
                }
                window.recaptchaVerifier.render().then((widgetID) => {
                    grecaptcha.reset(widgetID);
                });
                setBoxKey((oldKey) => oldKey + 1);
                toggleLoading();
            });
    };

    const changeHandler = (name) => (event) => {
        if (name === "phone") setPhoneNumber(event.target.value);
        else if (name === "countryCode") setCountryCode(event.target.value);
    };

    return (
        <form>
            <LoadingScreen />
            <Stack spacing={2} sx={{ justifyContent: "center" }}>
                <Collapse in={error.state}>
                    <Alert
                        severity="error"
                        onClose={() => setError({ state: false, message: "" })}
                    >
                        {error.message}
                    </Alert>
                </Collapse>
                <TextField
                    label="Enter phone number"
                    value={phoneNumber}
                    onChange={changeHandler("phone")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{
                                    lineHeight: "1.4375em",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <span style={{ marginTop: "-4px" }}>+</span>
                                <InputBase
                                    value={countryCode}
                                    onChange={changeHandler("countryCode")}
                                    placeholder="XX"
                                    sx={{
                                        maxWidth: "2rem",
                                        marginLeft: "2px",
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        autoComplete: "off",
                    }}
                />
                <div ref={setRecaptchaVerifier} key={boxKey}></div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onMobileSubmit}
                >
                    Continue
                </Button>
            </Stack>
        </form>
    );
};

export default LoginForm;
