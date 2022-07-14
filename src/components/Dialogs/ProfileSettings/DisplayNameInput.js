import React, { useState } from "react";

import { useUpdateProfile } from "react-firebase-hooks/auth";
import updateFirestoreUser from "../../../functions/updateFirestoreUser";
import { Box, Button, CircularProgress } from "@mui/material";
import InputDialog from "../InputDialog";

const DisplayNameInput = ({ auth }) => {
    const [value, setValue] = useState("");
    const [updateProfile, updatingProfile] = useUpdateProfile(auth);
    const open = !auth.currentUser.displayName;
    const disableContinue = !value.trim() || updatingProfile;

    const continueHandler = async () => {
        try {
            await Promise.all([
                updateProfile({
                    displayName: value,
                    photoURL: auth.currentUser.photoURL,
                }),
                updateFirestoreUser(auth.currentUser.uid, {
                    displayName: value,
                }),
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const changeHandler = (event) => {
        setValue(event.target.value);
    };

    return (
        open && (
            <InputDialog
                open={open}
                onClose={() => {}}
                onChange={changeHandler}
                title="Display Name"
                body="Please enter a display name to continue."
                input={{ label: "Display Name", value: value, type: "text" }}
                actions={
                    <Box sx={{ position: "relative" }}>
                        <Button
                            disabled={disableContinue}
                            color="secondary"
                            onClick={continueHandler}
                            variant="contained"
                        >
                            Continue
                            {updatingProfile && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        marginTop: "-12px",
                                        marginLeft: "-12px",
                                    }}
                                />
                            )}
                        </Button>
                    </Box>
                }
            />
        )
    );
};

export default DisplayNameInput;
