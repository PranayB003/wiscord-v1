import React, { useState } from "react";

import { Stack, Button, Collapse, Alert } from "@mui/material";
import OTPInput from "./OTPInput";

const OTPForm = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState({ state: false, message: "" });

    const confirmHandler = () => {
        window.confirmationResult
            .confirm(otp)
            .then((result) => {
                const user = result.user;
                console.log(user);
            })
            .catch((err) => {
                console.error(err);
                let message = err.message
                    .split(" ")[2]
                    .replace(/(^\([a-z]+\/|\))/g, "")
                    .split("-")
                    .join(" ");
                setError({ state: true, message });
            });
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
            <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={otp.length !== 6}
                onClick={confirmHandler}
            >
                Confirm
            </Button>
        </Stack>
    );
};

export default OTPForm;