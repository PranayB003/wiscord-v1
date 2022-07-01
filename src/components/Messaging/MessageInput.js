import React, { useRef } from "react";

import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const StyledTextField = styled((props) => <TextField {...props} />)(
    ({ theme }) => ({
        "& .MuiFilledInput-root": {
            background: "#F9F9FB",
            border: "1px solid #F2F2F2",
            boxSizing: "border-box",
            borderRadius: "17px",
            padding: "10px 0",
        },
        "& .MuiFilledInput-input": {
            padding: "0px 15px",
            fontSize: theme.typography.subtitle1.fontSize,
        },
    })
);

const MessageInput = ({ onSubmit }) => {
    const messageRef = useRef();

    const submitHandler = (event) => {
        const timeNow = new Date();
        const newMessage = messageRef.current.value;

        if (newMessage === "") return;
        onSubmit(newMessage, timeNow);
        messageRef.current.value = "";
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
                            color="secondary"
                            onClick={submitHandler}
                            type="submit"
                        >
                            <BsFillArrowUpCircleFill />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            inputRef={messageRef}
            multiline
            maxRows={4}
        />
    );
};

export default MessageInput;
