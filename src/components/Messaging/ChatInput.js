import React, { useState } from "react";

import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiFilledInput-root": {
        boxSizing: "border-box",
        borderRadius: "8px",
        padding: "10px 0",
    },
    "& .MuiFilledInput-input": {
        padding: "0px 15px",
        fontSize: theme.typography.body1.fontSize,
    },
}));

const ChatInput = ({ onSubmit, disabled = false }) => {
    const [message, setMessage] = useState("");

    const changeHandler = (event) => {
        setMessage(event.target.value);
    };

    const submitHandler = (event) => {
        setMessage("");
        const newMessage = message.trim();

        if (newMessage === "") return;
        onSubmit(newMessage);
    };

    const keyDownHandler = (event) => {
        if (!event.shiftKey && event.key === "Enter") {
            event.preventDefault();
            submitHandler(event);
        }
    };

    return (
        <StyledTextField
            variant="filled"
            fullWidth
            InputProps={{
                disableUnderline: true,
                placeholder: "Message",
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            size="large"
                            color="disabled"
                            onClick={submitHandler}
                            disabled={disabled}
                        >
                            <BsFillArrowUpCircleFill />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            multiline
            maxRows={4}
            value={message}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            disabled={disabled}
        />
    );
};

export default ChatInput;
