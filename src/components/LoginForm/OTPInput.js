import React, { useState, useEffect } from "react";

import { Stack, styled } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledInput = styled("input", {
    shouldForwardProp: (prop) => prop !== "small",
})(({ small, disabled, theme }) => ({
    maxWidth: small ? "30px" : "40px",
    minWidth: small ? "25px" : "30px",
    outline: "none",
    border: "none",
    borderBottom: `${disabled ? "1px" : "2px"} solid ${
        disabled ? theme.palette.text.disabled : "white"
    }`,
    paddingBlock: "15px",
    textAlign: "center",
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    backgroundColor: "transparent",
    color: "white",
}));

/* 
    getValue accepts a function which is called on every render of this component with
    the currently entered OTP as its only argument, inputSize specifies digits in OTP
*/
const OTPInput = ({ getValue, onManualNavigate, inputSize = 6 }) => {
    const isSmallMobile = useMediaQuery("(max-width:375px)");
    const [values, setValues] = useState({
        prevActiveIndex: 0,
        enteredValues: Array(inputSize).fill(""),
    });

    let currentActiveIndex = values.prevActiveIndex;
    if (values.enteredValues[currentActiveIndex]) {
        currentActiveIndex = Math.min(inputSize - 1, currentActiveIndex + 1);
    }
    useEffect(() => {
        const activeInputField = document.getElementById(
            `otpDigit${currentActiveIndex}`
        );
        activeInputField.focus();

        getValue(values.enteredValues.join(""));
    }, [currentActiveIndex, values, getValue]);

    const keyPressHandler = (event) => {
        console.log("keypress handler");
        if (event.key === "Backspace") {
            setValues((oldState) => {
                const newState = {
                    ...oldState,
                    enteredValues: [...oldState.enteredValues],
                };
                let clearIndex = newState.prevActiveIndex;
                if (!newState.enteredValues[clearIndex]) {
                    clearIndex = Math.max(0, clearIndex - 1);
                }
                newState.enteredValues[clearIndex] = "";
                newState.prevActiveIndex = Math.max(
                    0,
                    newState.prevActiveIndex - 1
                );
                return newState;
            });
        }
    };

    const inputHandler = (event) => {
        console.log("input handler");
        if (!/^[0-9]+$/.test(event.data)) {
            event.preventDefault();
        }
    };

    const changeHandler = (event) => {
        console.log("change handler");
        setValues((oldState) => {
            const newState = {
                ...oldState,
                enteredValues: [...oldState.enteredValues],
            };
            if (newState.enteredValues[newState.prevActiveIndex]) {
                newState.prevActiveIndex = Math.min(
                    inputSize - 1,
                    newState.prevActiveIndex + 1
                );
            }
            const inputDigits = event.target.value
                ?.split("")
                ?.slice(0, inputSize - newState.prevActiveIndex);
            inputDigits?.forEach((digit) => {
                newState.enteredValues[newState.prevActiveIndex] = digit;
                newState.prevActiveIndex = Math.min(
                    inputSize - 1,
                    newState.prevActiveIndex + 1
                );
            });
            return newState;
        });
    };

    const clickHandler = (event) => {
        if (event.target.id !== `otpDigit${currentActiveIndex}`) {
            onManualNavigate();
        }
    };

    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            {values.enteredValues.map((value, index) => (
                <div key={index} onClick={clickHandler}>
                    <StyledInput
                        id={`otpDigit${index}`}
                        type="tel"
                        value={value}
                        tabIndex={index === currentActiveIndex ? 0 : -1}
                        onKeyDown={keyPressHandler}
                        onBeforeInput={inputHandler}
                        onChange={changeHandler}
                        disabled={index !== currentActiveIndex}
                        autoComplete="off"
                        small={isSmallMobile}
                    />
                </div>
            ))}
        </Stack>
    );
};
export default OTPInput;
