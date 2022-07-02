import React from "react";

import { styled, Box, Typography } from "@mui/material";

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "from",
})(({ from }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: from === "me" ? "flex-end" : "flex-start",
}));

const MessageBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "from",
})(({ from, theme }) => ({
    maxWidth: "85%",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: from === "me" ? "15px 15px 0px 15px" : "15px 15px 15px 0px",
    background:
        from === "me" ? theme.palette.secondary.main : "rgb(148, 21, 187)",
    overflow: "hidden",
}));

const TimeBox = styled(Box)({
    display: "flex",
    alignItems: "center",
});

const ChatMessage = ({ from, body, time }) => {
    return (
        <StyledBox from={from}>
            <MessageBox from={from}>
                {from !== "me" && (
                    <Typography color="#FFFFFF" fontWeight="600">
                        {from}
                    </Typography>
                )}
                <Typography
                    color="#FFFFFF"
                    style={{
                        overflow: "hidden",
                        overflowWrap: "break-word",
                        whiteSpace: "break-spaces",
                    }}
                >
                    {body}
                </Typography>
            </MessageBox>
            <TimeBox>
                <Typography
                    variant="subtitle3"
                    color="#B4B4B4"
                    paddingRight="5px"
                >
                    {`${time.getHours()}:${time.getMinutes()}`}
                </Typography>
            </TimeBox>
        </StyledBox>
    );
};

export default ChatMessage;
