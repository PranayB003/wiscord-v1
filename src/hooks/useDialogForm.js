import React, { useState } from "react";

import { Button } from "@mui/material";
import InputDialog from "../components/Dialogs/InputDialog";

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
            <InputDialog
                open={open}
                onClose={closeDialogForm}
                onChange={changeHandler}
                title={title}
                body={body}
                input={{
                    label: label,
                    value: value,
                    type: type,
                }}
                actions={
                    <>
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
                    </>
                }
            />
        );
    };

    return {
        openDialogForm,
        closeDialogForm,
        DialogForm,
    };
};

export default useDialogForm;
