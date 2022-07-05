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
    shouldForwardProp: (prop) => prop !== "fromMe" || prop !== "last",
})(({ last, fromMe, theme }) => ({
    maxWidth: "85%",
    minWidth: "15px",
    padding: "5px 10px",
    marginBottom: "5px",
    borderRadius: "15px",
    borderBottomRightRadius: last && fromMe ? "0px" : "15px",
    borderBottomLeftRadius: last && !fromMe ? "0px" : "15px",
    background: fromMe
        ? theme.palette.secondary.light
        : theme.palette.background.gray,
    overflow: "hidden",
    position: "relative",
}));

const ChatMessage = ({ messageList, from }) => {
    const { createdAt } = messageList[0];
    const lastIndex = messageList.length - 1;

    return (
        <StyledBox from={from}>
            {messageList.map((message, index) => {
                const { id, body } = message;
                return (
                    <MessageBox
                        key={id}
                        fromMe={from === "me"}
                        last={index === lastIndex}
                    >
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
                );
            })}
            <Typography
                variant="overline"
                color="#B4B4B4"
                paddingRight="2px"
                lineHeight="1"
            >
                {`${createdAt.getHours()}:${(
                    "0" + createdAt.getMinutes()
                ).slice(-2)}`}
            </Typography>
        </StyledBox>
    );
};

export default ChatMessage;
