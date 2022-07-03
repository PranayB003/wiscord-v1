import React from "react";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";

const ProfileTitleBar = ({ onClose, onSave }) => {
    return (
        <AppBar sx={{ position: "relative" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                >
                    <IoCloseSharp />
                </IconButton>
                <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                >
                    Profile
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default ProfileTitleBar;
