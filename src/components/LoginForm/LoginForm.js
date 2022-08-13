// The comment below is necessary to remove warnings
/* global grecaptcha */
import React, { useCallback, useState } from "react";

import { Stack, Button, Collapse, Alert } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import useLoadingBackdrop from "../../hooks/useLoadingBackdrop";
import getFirebaseErrorMessage from "../../utils/getFirebaseErrorMessage";
import PhoneInput from "./PhoneInput";

const LoginForm = ({ auth, setData }) => {
    const [phoneNumber, setPhoneNumber] = useState("+91");
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

    const onMobileSubmit = (event) => {
        event.preventDefault();
        const data = phoneNumber.trim();
        toggleLoading();
        signInWithPhoneNumber(auth, data, window.recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toggleLoading();
                setData(data);
            })
            .catch((error) => {
                let code = getFirebaseErrorMessage(error);
                setError({
                    state: true,
                    message: `Error: ${code}.`,
                });
                window.recaptchaVerifier.render().then((widgetID) => {
                    grecaptcha.reset(widgetID);
                });
                setBoxKey((oldKey) => oldKey + 1);
                toggleLoading();
            });
    };

    const changeHandler = (value) => {
        setPhoneNumber(value);
    };

    return (
        <>
            <LoadingScreen />
            <Stack spacing={2}>
                <Collapse in={error.state}>
                    <Alert
                        severity="error"
                        onClose={() => setError({ state: false, message: "" })}
                    >
                        {error.message}
                    </Alert>
                </Collapse>{" "}
                <Stack component="form" spacing={2}>
                    <PhoneInput value={phoneNumber} onChange={changeHandler} />
                    <div ref={setRecaptchaVerifier} key={boxKey}></div>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={onMobileSubmit}
                        type="submit"
                    >
                        Continue
                    </Button>
                </Stack>
            </Stack>
        </>
    );
};

export default LoginForm;
