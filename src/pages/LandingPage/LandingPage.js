import React from "react";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <div style={{ display: "flex" }}>
            <div
                className={`${styles["landing-gradient-bg"]} ${styles["gradient-div"]}`}
            ></div>
            <div className={`${styles["login-div"]}`}>Hemllo</div>
        </div>
    );
};

export default LandingPage;
