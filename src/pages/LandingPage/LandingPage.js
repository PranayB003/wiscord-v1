import React, { useState } from "react";

import { Button, Stack, TextField, Typography } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LandingPage.module.css";
import LandingGradient from "../../components/LandingGradient/LandingGradient";
import OTPForm from "../../components/LoginForm/OTPForm";

const LandingPage = ({ auth }) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const mainContent = phoneNumber ? (
        <>
            <Typography variant="body1" color="#FFFFFF" textAlign="center">
                {`Please enter the 6 digit OTP sent to your mobile number ${phoneNumber}.`}
            </Typography>
            <OTPForm />
        </>
    ) : (
        <>
            <Typography variant="body1" color="#FFFFFF" textAlign="center">
                Login or Register using your phone number to continue to your
                account.
            </Typography>
            <LoginForm auth={auth} setData={setPhoneNumber} />
        </>
    );

    return (
        <div className={styles["container-div"]}>
            <LandingGradient />
            <div className={`${styles["login-div"]}`}>
                <Stack spacing={4} sx={{ paddingInline: "4vw" }}>
                    <Typography variant="h4" textAlign="center" color="#FFFFFF">
                        Welcome to WisCord!
                    </Typography>
                    {mainContent}
                </Stack>
            </div>
        </div>
    );
};

export default LandingPage;
