import React from "react";

import { Dialog, Slide, Stack } from "@mui/material";
import ProfileTitleBar from "./ProfileTitleBar";
import ProfileDetails from "./ProfileDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileSettingsDialog = ({ open, onClose }) => {
    const saveHandler = () => {
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <ProfileTitleBar onClose={onClose} onSave={saveHandler} />
            <Stack padding="15px">
                <ProfileDetails />
            </Stack>
        </Dialog>
    );
};

export default ProfileSettingsDialog;
