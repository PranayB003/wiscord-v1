import React from "react";

import { styled, Box, Typography } from "@mui/material";
import { IconContext } from "react-icons";

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "from",
})(({ from }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: from === "me" ? "flex-end" : "flex-start",
}));

const MessageBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "from",
})(({ from, theme }) => ({
    maxWidth: "85%",
    padding: "15px",
    marginBottom: "5px",
    borderRadius: from === "me" ? "15px 15px 0px 15px" : "15px 15px 15px 0px",
    background: from === "me" ? theme.secondary.main : "#F1F4F7",
    overflow: "hidden",
}));

const TimeBox = styled(Box)({
    display: "flex",
    alignItems: "center",
});

const ChatMessage = ({ from, body, time }) => {
    return (
        <StyledBox from={from}>
            {body.map((message, index) => (
                <MessageBox key={index} from={from}>
                    <Typography
                        color={from === "me" ? "#FFFFFF" : "#000000"}
                        style={{
                            overflow: "hidden",
                            overflowWrap: "break-word",
                            whiteSpace: "break-spaces",
                        }}
                    >
                        {message}
                    </Typography>
                </MessageBox>
            ))}
            <TimeBox>
                <Typography
                    variant="subtitle3"
                    color={from === "me" ? "#6B779A" : "#000000"}
                    paddingRight="5px"
                >
                    {`${time.getHours()}:${time.getMinutes()}`}
                </Typography>
            </TimeBox>
        </StyledBox>
    );
};

export default ChatMessage;
