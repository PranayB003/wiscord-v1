import React from "react";

import { Button, Stack, styled, Typography } from "@mui/material";

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
    justifyContent: "flex-start",
    textTransform: "none",
    backgroundColor: active ? theme.palette.background.gray : "auto",
}));

const GlobalContent = () => {
    return (
        <>
            <Stack spacing="2px">
                <StyledButton fullWidth active={true}>
                    <Typography lineHeight={1.1}>#Global_Chat</Typography>
                </StyledButton>
            </Stack>
        </>
    );
};

export default GlobalContent;
