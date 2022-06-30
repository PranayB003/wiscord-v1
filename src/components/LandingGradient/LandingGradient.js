import React from "react";

import { Stack, Typography } from "@mui/material";
import styles from "./LandingGradient.module.css";

const LandingGradient = () => {
    return (
        <div
            className={`${styles["landing-gradient-bg"]} ${styles["gradient-div"]}`}
            styles={{
                display: "flex",
                alignItems: "center",
                border: "3px solid red",
            }}
        >
            <Stack>
                <Typography textAlign="center" variant="h1" color="#FFFFFF">
                    <b>BEST</b>
                </Typography>
                <Typography textAlign="center" variant="h4" color="#FFFFFF">
                    <b>of</b>
                </Typography>
                <Typography variant="h1" textAlign="center" color="#FFFFFF">
                    <b>
                        <i>Both</i>
                    </b>
                </Typography>
                <Typography variant="h1" color="#FFFFFF" textAlign="center">
                    <b>Worlds</b>
                </Typography>
            </Stack>
        </div>
    );
};

export default LandingGradient;
