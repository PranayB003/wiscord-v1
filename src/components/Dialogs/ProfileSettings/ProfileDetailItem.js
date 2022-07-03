import React from "react";

import { styled, Stack, Typography, Button, Skeleton } from "@mui/material";
import useDialogForm from "../../../hooks/useDialogForm";

export const FlexDiv = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "5px",
    backgroundColor: "rgb(79, 84, 91)",
    color: theme.palette.text.primary,
    "&:hover": {
        backgroundColor: "rgb(104, 109, 114)",
    },
}));

const ProfileDetailItem = ({
    name,
    value,
    type,
    editable,
    updateHandler,
    loading,
}) => {
    const continueHandler = updateHandler;
    const { openDialogForm, DialogForm } = useDialogForm(
        `Change ${name}`,
        "",
        `New ${name}`,
        type,
        continueHandler
    );

    return (
        <>
            <FlexDiv>
                <Stack>
                    <Typography
                        variant="caption"
                        textTransform="uppercase"
                        color="rgb(181, 184, 187)"
                    >
                        {loading ? <Skeleton width={100} /> : name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {loading ? (
                            <Skeleton width={200} />
                        ) : (
                            value ||
                            `You haven't added your ${name.toLowerCase()} yet.`
                        )}
                    </Typography>
                </Stack>
                {loading ? (
                    <Skeleton
                        variant="rectangular"
                        width={60}
                        height={40}
                        sx={{ borderRadius: "5px" }}
                    />
                ) : (
                    <StyledButton
                        variant="contained"
                        disableElevation
                        disabled={!editable}
                        onClick={openDialogForm}
                    >
                        {value ? "Edit" : "Add"}
                    </StyledButton>
                )}
            </FlexDiv>
            <DialogForm />
        </>
    );
};

export default ProfileDetailItem;
