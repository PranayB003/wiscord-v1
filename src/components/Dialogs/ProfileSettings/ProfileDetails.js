import React, { useContext, useState, useEffect } from "react";

import { FirebaseContext } from "../../../App";
import { useUpdateProfile, useUpdateEmail } from "react-firebase-hooks/auth";
import { Box, styled, Stack, Snackbar, Alert } from "@mui/material";
import ProfileDetailItem from "./ProfileDetailItem";
import ProfilePhotoDetail from "./ProfilePhotoDetail";
import getFirebaseErrorMessage from "../../../utils/getFirebaseErrorMessage";

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

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.gray,
    borderRadius: theme.shape.borderRadius,
}));

const ProfileDetails = ({ onSave }) => {
    const { auth } = useContext(FirebaseContext);
    const { photoURL, displayName, phoneNumber, email } = auth.currentUser;

    const [updateProfile, updatingProfile, profileError] =
        useUpdateProfile(auth);
    const [updateEmail, updatingEmail, emailError] = useUpdateEmail(auth);
    const updating = updatingProfile || updatingEmail;

    const [updateError, setUpdateError] = useState(false);
    useEffect(() => {
        if (profileError) {
            let message = getFirebaseErrorMessage(profileError);
            setUpdateError(message);
        }
    }, [profileError]);
    useEffect(() => {
        if (emailError) {
            let message = getFirebaseErrorMessage(emailError);
            setUpdateError(message);
        }
    }, [emailError]);
    const dismissUpdateError = () => {
        setUpdateError(null);
    };

    const details = [
        {
            name: "Username",
            value: displayName,
            type: "text",
            editable: true,
            updateHandler: (newDisplayName) => {
                updateProfile({
                    displayName: newDisplayName,
                    photoURL: photoURL,
                });
            },
        },
        {
            name: "Email",
            value: email,
            type: "email",
            editable: true,
            updateHandler: (newEmail) => {
                updateEmail(newEmail);
            },
        },
        {
            name: "Phone Number",
            value: phoneNumber,
            type: "tel",
            editable: false,
        },
    ];

    return (
        <>
            <DarkBox>
                <ProfilePhotoDetail
                    displayName={displayName}
                    photoURL={photoURL}
                    loading={updating}
                    updateHandler={(newPhotoURL) => {
                        return updateProfile({
                            displayName: displayName,
                            photoURL: newPhotoURL,
                        });
                    }}
                />
                <StyledStack>
                    {details.map((detail) => (
                        <ProfileDetailItem
                            key={detail.name}
                            name={detail.name}
                            value={detail.value}
                            type={detail.type}
                            editable={detail.editable}
                            updateHandler={detail.updateHandler}
                            loading={updating}
                        />
                    ))}
                </StyledStack>
            </DarkBox>
            <Snackbar
                open={Boolean(updateError)}
                autoHideDuration={6000}
                onClose={dismissUpdateError}
            >
                <Alert
                    onClose={dismissUpdateError}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {`There was an error updating your profile ${
                        updateError ? ": " + updateError : ""
                    }`}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProfileDetails;
