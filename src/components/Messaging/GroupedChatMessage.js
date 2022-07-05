import React from "react";

import { styled, Box, Typography } from "@mui/material";

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "fromMe",
})(({ fromMe }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: fromMe ? "flex-end" : "flex-start",
}));

const MessageBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "fromMe",
})(({ fromMe, theme }) => ({
    maxWidth: "85%",
    minWidth: "15px",
    padding: "5px 10px",
    marginBottom: "3px",
    borderRadius: "15px",
    background: fromMe
        ? theme.palette.secondary.light
        : theme.palette.background.gray,
    position: "relative",
    zIndex: "1",
    left: fromMe ? "-15px" : "15px",
}));

const CurlyCornerRight = styled("div", {
    shouldForwardProp: (prop) => prop !== "fromMe",
})(({ theme }) => ({
    position: "relative",
    width: "1px",
    height: "1px",
    "&:before": {
        content: "''",
        backgroundColor: theme.palette.secondary.light,
        width: "27px",
        height: "23px",
        position: "absolute",
        borderRadius: "15px",
        bottom: "3px",
        left: "-25px",
        zIndex: "0",
    },
    "&:after": {
        content: "''",
        position: "absolute",
        backgroundColor: theme.palette.background.darkestGray,
        width: "25px",
        height: "37px",
        bottom: "4px",
        left: "-14px",
        borderRadius: "0 0 15px 15px",
    },
}));

const CurlyCornerLeft = styled("div", {
    shouldForwardProp: (prop) => prop !== "fromMe",
})(({ theme }) => ({
    position: "relative",
    width: "1px",
    height: "1px",
    "&:before": {
        content: "''",
        backgroundColor: theme.palette.background.gray,
        width: "27px",
        height: "23px",
        position: "absolute",
        borderRadius: "15px",
        bottom: "3px",
        right: "-25px",
    },
    "&:after": {
        content: "''",
        position: "absolute",
        backgroundColor: theme.palette.background.darkestGray,
        width: "25px",
        height: "37px",
        bottom: "4px",
        right: "-14px",
        borderRadius: "0 0 15px 15px",
    },
}));

const GroupedChatMessage = ({ messageList, from }) => {
    const { createdAt } = messageList[0];
    const fromMe = from === "me";

    return (
        <StyledBox fromMe={fromMe}>
            {messageList.map((message) => {
                const { id, body } = message;
                return (
                    <MessageBox key={id} fromMe={fromMe}>
                        {!fromMe && (
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
            {fromMe ? <CurlyCornerRight /> : <CurlyCornerLeft />}
            <Typography
                variant="overline"
                color="#B4B4B4"
                marginTop="3px"
                lineHeight="1"
                paddingInline="15px"
            >
                {`${createdAt.getHours()}:${(
                    "0" + createdAt.getMinutes()
                ).slice(-2)}`}
            </Typography>
        </StyledBox>
    );
};

export default GroupedChatMessage;
