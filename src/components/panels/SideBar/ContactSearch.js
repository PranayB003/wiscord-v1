import React from "react";

import { FilledInput, IconButton, styled } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

const StyledSearchBox = styled(FilledInput)(({ theme }) => ({
    "& .MuiFilledInput-input": {
        padding: "8px 12px",
    },
    borderRadius: "5px",
    width: "100%",
}));

const ContactSearch = ({ value, onChange, onClear }) => {
    return (
        <StyledSearchBox
            disableUnderline
            placeholder="Search..."
            value={value}
            onChange={onChange}
            startAdornment={<BsSearch />}
            endAdornment={
                value && (
                    <IconButton onClick={onClear}>
                        <IoIosClose />
                    </IconButton>
                )
            }
        />
    );
};

export default ContactSearch;
