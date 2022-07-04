import React, { useContext, useEffect, useState } from "react";

import { ref, getDownloadURL } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { FirebaseContext } from "../../../App.js";

import {
    Avatar,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    Box,
    CircularProgress,
    Stack,
    Snackbar,
    Alert,
    LinearProgress,
} from "@mui/material";
import { BsImageFill } from "react-icons/bs";
import getFirebaseErrorMessage from "../../../utils/getFirebaseErrorMessage.js";
import useFbDownloadURL from "../../../hooks/useFbDownloadUrl.js";

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "20px",
}));

const FileInput = styled("input")(() => ({
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1",
}));

const ImageSelectDialog = ({ open, onClose, onUpdate }) => {
    // TODO: Add option to delete profile image
    const { auth, storage } = useContext(FirebaseContext);

    const [uploadedImage, setUploadedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
    const [downloadURL, downloading, downloadError] = useFbDownloadURL();

    const closeHandler = () => {
        if (!uploading) {
            setUploadedImage(null);
            onClose();
        }
    };

    const imageSelectHandler = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        if (file) {
            reader.onload = () => {
                setUploadedImage({ file: file, data: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadHandler = async () => {
        const storageRef = ref(
            storage,
            `profileImages/${auth.currentUser.uid}`
        );
        if (uploadedImage) {
            const res = await uploadFile(storageRef, uploadedImage.file, {
                contentType: "image/*",
            });
            console.log(res);
            const url = await downloadURL(storageRef);
            if (url) {
                onUpdate(url);
                closeHandler();
            }
        }
    };

    const dismissError = () => {
        setErrorMessage("");
    };

    useEffect(() => {
        if (uploadError) {
            setErrorMessage(getFirebaseErrorMessage(uploadError));
        }
    }, [uploadError]);

    const progress = snapshot
        ? (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        : 0;

    return (
        <Dialog open={open} onClose={closeHandler}>
            <DialogTitle>Profile Image</DialogTitle>
            <StyledDialogContent>
                <Avatar
                    alt={auth.currentUser.displayName}
                    src={
                        uploadedImage
                            ? uploadedImage.data
                            : auth.currentUser.photoURL
                    }
                    sx={{ width: "80px", height: "80px", mr: "15px" }}
                />
                <FileInput
                    id="profile-image"
                    name="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={imageSelectHandler}
                    tabIndex="-1"
                />
                <Stack>
                    <Button
                        component="label"
                        htmlFor="profile-image"
                        color="warning"
                        variant="outlined"
                        endIcon={<BsImageFill />}
                        onKeyUp={(e) => {
                            if (e.key === " " || e.key === "Enter")
                                e.target.click();
                        }}
                    >
                        Select
                    </Button>
                </Stack>
            </StyledDialogContent>
            <DialogActions>
                <Stack spacing={1} width="100%">
                    <Stack direction="row" spacing={1} alignSelf="end">
                        <Button onClick={closeHandler} disabled={uploading}>
                            Cancel
                        </Button>
                        <Box sx={{ position: "relative" }}>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={uploadHandler}
                                disabled={!uploadedImage || uploading}
                            >
                                Continue
                            </Button>
                            {uploading && (
                                <CircularProgress
                                    size={24}
                                    variant="determinate"
                                    value={Math.min(progress, 85)}
                                    sx={{
                                        color: "success",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        marginTop: "-12px",
                                        marginLeft: "-12px",
                                    }}
                                />
                            )}
                        </Box>
                    </Stack>
                    {downloading && <LinearProgress />}
                </Stack>
            </DialogActions>
            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={6000}
                onClose={dismissError}
            >
                {uploadError && (
                    <Alert
                        severity="error"
                        onClose={dismissError}
                        sx={{ width: "100%" }}
                    >
                        {`Error uploading image`}
                    </Alert>
                )}
            </Snackbar>
        </Dialog>
    );
};

export default ImageSelectDialog;
