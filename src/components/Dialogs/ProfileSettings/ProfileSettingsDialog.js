import React from "react";

import { Dialog, Slide } from "@mui/material";
import ProfileTitleBar from "./ProfileTitleBar";
// import ListItemText from "@mui/material/ListItemText";
// import ListItem from "@mui/material/ListItem";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";

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
            {/* <List>
                <ListItem button>
                    <ListItemText
                        primary="Phone ringtone"
                        secondary="Titania"
                    />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                    />
                </ListItem>
            </List> */}
        </Dialog>
    );
};

export default ProfileSettingsDialog;
