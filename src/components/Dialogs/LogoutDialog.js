import React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

const LogoutDialog = ({ open, onClose, onLogout }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="log-out"
            aria-describedby="log-out-confirmation"
        >
            <DialogTitle id="alert-dialog-title">{"Log Out"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to log out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button
                    onClick={() => {
                        onLogout();
                    }}
                    autoFocus
                    variant="contained"
                    color="error"
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogoutDialog;
