import React, { useState } from "react";

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const useDialogForm = (
    title = "Form Title",
    body = "Form Body",
    label = "Input Label",
    type = "text",
    continueHandler = function () {}
) => {
    const [open, setOpen] = useState(false);

    const openDialogForm = () => {
        setOpen(true);
    };

    const closeDialogForm = () => {
        setOpen(false);
    };

    const DialogForm = () => {
        const [value, setValue] = useState("");

        const changeHandler = (event) => {
            setValue(event.target.value);
        };

        const cancelHandler = () => {
            setValue("");
            closeDialogForm();
        };

        return (
            <Dialog open={open} onClose={closeDialogForm}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>
                    {body && <DialogContentText>{body}</DialogContentText>}
                    <TextField
                        autoFocus
                        margin="dense"
                        id={label}
                        label={label}
                        type={type}
                        fullWidth
                        variant="standard"
                        value={value}
                        onChange={changeHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            closeDialogForm();
                            cancelHandler();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            continueHandler(value);
                            closeDialogForm();
                        }}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return {
        openDialogForm,
        closeDialogForm,
        DialogForm,
    };
};

export default useDialogForm;
