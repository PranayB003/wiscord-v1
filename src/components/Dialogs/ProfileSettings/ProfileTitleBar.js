import React from "react";

import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import { IoCloseSharp, IoSave } from "react-icons/io5";

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
                <Button
                    autoFocus
                    variant="contained"
                    color="success"
                    onClick={onSave}
                    startIcon={<IoSave />}
                >
                    Save
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default ProfileTitleBar;
