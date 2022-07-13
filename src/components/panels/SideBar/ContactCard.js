import React from "react";

import { Stack, Avatar, Typography, styled } from "@mui/material";

const StyledContainer = styled(Stack)(({ theme }) => ({
    borderRadius: "5px",
    backgroundColor: theme.palette.background.gray,
    "&:hover": {
        backgroundColor: theme.palette.background.darkGray,
    },
}));

const ContactCard = ({ user }) => {
    return (
        <StyledContainer
            direction="row"
            spacing={1.5}
            alignItems="center"
            paddingY="5px"
            paddingX="7px"
            marginBottom="3px"
        >
            <Avatar
                alt={user.displayName}
                src={user.photoURL}
                sx={{ width: "35px", height: "35px" }}
            />
            <Typography
                fontWeight={600}
                color="disabled.main"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {user.displayName || user.phoneNumber}
            </Typography>
        </StyledContainer>
    );
};

export default ContactCard;
