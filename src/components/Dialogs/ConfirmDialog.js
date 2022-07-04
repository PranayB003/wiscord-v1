import React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    display = {
        title: "Confirm ?",
        message: "",
    },
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="log-out"
            aria-describedby="log-out-confirmation"
        >
            <DialogTitle id="alert-dialog-title">{display.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {display.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button
                    onClick={() => {
                        onConfirm();
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

export default ConfirmDialog;
