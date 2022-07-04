import React, { useState, useContext } from "react";

import { deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";
import { FirebaseContext } from "../../../App";

import {
    Box,
    Button,
    Dialog,
    Divider,
    Slide,
    Stack,
    Typography,
    Snackbar,
    Alert,
    LinearProgress,
} from "@mui/material";
import ProfileTitleBar from "./ProfileTitleBar";
import ProfileDetails from "./ProfileDetails";
import ConfirmDialog from "../ConfirmDialog";
import getFirebaseErrorMessage from "../../../utils/getFirebaseErrorMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileSettingsDialog = ({ open, onClose, onLogout }) => {
    const { auth, storage } = useContext(FirebaseContext);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const toggleConfirmDialog = () => {
        setConfirmDialogOpen((value) => !value);
    };

    const deleteAccountConfirmHandler = async () => {
        const profileImageRef = ref(
            storage,
            `profileImages/${auth.currentUser.uid}`
        );
        setConfirmDialogOpen(false);
        setLoading(true);
        try {
            deleteObject(profileImageRef);
            await deleteUser(auth.currentUser);
        } catch (error) {
            console.error(error);
            let message = getFirebaseErrorMessage(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const dismissError = () => {
        setError(null);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <ProfileTitleBar onClose={onClose} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Stack padding="15px" maxWidth="580px" spacing={2}>
                    {loading && <LinearProgress />}
                    <ProfileDetails auth={auth} onError={setError} />
                    <Divider />
                    <Box paddingX="15px">
                        <Typography variant="h5" color="text.primary">
                            Account Options
                        </Typography>
                        <Stack spacing={3} direction="row" mt="15px">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={onLogout}
                            >
                                Log Out
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={toggleConfirmDialog}
                            >
                                Delete Account
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <ConfirmDialog
                open={confirmDialogOpen}
                onClose={toggleConfirmDialog}
                onConfirm={deleteAccountConfirmHandler}
                display={{
                    title: "Delete Account?",
                    message: "Are you sure you want to delete your account?",
                }}
            />
            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                onClose={dismissError}
            >
                <Alert
                    onClose={dismissError}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {`Error${error ? `: ${error}.` : ""}`}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ProfileSettingsDialog;
