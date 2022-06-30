import React, { useState, useEffect } from "react";

import { Stack, styled } from "@mui/material";

const StyledInput = styled("input")(({ disabled, theme }) => ({
    maxWidth: "40px",
    minWidth: "30px",
    outline: "none",
    border: "none",
    borderBottom: `1px solid ${
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
const OTPInput = ({ getValue, inputSize = 6 }) => {
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
        if (!isFinite(event.data) || event.data === " ") {
            event.preventDefault();
        }
    };

    const changeHandler = (event) => {
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
            newState.enteredValues[newState.prevActiveIndex] =
                newState.enteredValues[newState.prevActiveIndex] ||
                event.target.value;
            return newState;
        });
    };

    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            {values.enteredValues.map((value, index) => (
                <StyledInput
                    key={index}
                    id={`otpDigit${index}`}
                    type="text"
                    value={value}
                    tabIndex={index === currentActiveIndex ? 0 : -1}
                    onKeyDown={keyPressHandler}
                    onBeforeInput={inputHandler}
                    onChange={changeHandler}
                    disabled={index !== currentActiveIndex}
                />
            ))}
        </Stack>
    );
};
export default OTPInput;
