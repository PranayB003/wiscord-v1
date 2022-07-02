import React, { useContext } from "react";

import { Box, styled, Stack, Avatar, Typography, Button } from "@mui/material";
import { FirebaseContext } from "../../../App";

const DarkBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkerGray,
    borderRadius: theme.shape.borderRadius,
    width: "90vw",
    maxWidth: "550px",
    paddingInline: "15px",
    paddingBlock: "0 15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    alignSelf: "center",
}));

const FlexDiv = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.gray,
    borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "5px",
    backgroundColor: "rgb(79, 84, 91)",
    color: theme.palette.text.primary,
    "&:hover": {
        backgroundColor: "rgb(104, 109, 114)",
    },
}));

const ProfileDetailItem = ({ name, value }) => {
    return (
        <FlexDiv>
            <Stack>
                <Typography
                    variant="caption"
                    textTransform="uppercase"
                    color="rgb(181, 184, 187)"
                >
                    {name}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {value ||
                        `You haven't added your ${name.toLowerCase()} yet.`}
                </Typography>
            </Stack>
            <StyledButton variant="contained" disableElevation>
                {value ? "Edit" : "Add"}
            </StyledButton>
        </FlexDiv>
    );
};

const ProfileDetails = () => {
    const { auth } = useContext(FirebaseContext);
    const { photoURL, displayName, phoneNumber, email } = auth.currentUser;

    const details = [
        { name: "Username", value: displayName },
        { name: "Email", value: email },
        { name: "Phone Number", value: phoneNumber },
    ];

    return (
        <DarkBox>
            <FlexDiv>
                <Avatar
                    alt={displayName}
                    src={photoURL}
                    sx={{ width: "80px", height: "80px" }}
                />
                <Typography variant="h6" fontWeight={700} color="text.primary">
                    {displayName}
                </Typography>
            </FlexDiv>
            <StyledStack>
                {details.map((detail) => (
                    <ProfileDetailItem
                        key={detail.name}
                        name={detail.name}
                        value={detail.value}
                    />
                ))}
            </StyledStack>
        </DarkBox>
    );
};

export default ProfileDetails;
