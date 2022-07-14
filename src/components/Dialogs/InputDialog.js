import React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from "@mui/material";

const InputDialog = ({
    open,
    onClose,
    onChange,
    actions,
    title,
    body,
    input = { label: "Label", type: "text", value: "" },
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {body && <DialogContentText>{body}</DialogContentText>}
                <TextField
                    autoFocus
                    margin="dense"
                    id={input.label}
                    label={input.label}
                    type={input.type}
                    fullWidth
                    variant="standard"
                    value={input.value}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    );
};

export default InputDialog;
