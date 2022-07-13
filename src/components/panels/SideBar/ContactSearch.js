import React, { useRef, useState } from "react";

import { FilledInput, styled } from "@mui/material";
import { BsSearch } from "react-icons/bs";

const StyledSearchBox = styled(FilledInput)(({ theme }) => ({
    "& .MuiFilledInput-input": {
        padding: "8px 12px",
    },
    borderRadius: "5px",
    width: "100%",
}));

const ContactSearch = () => {
    const [searchString, setSearchString] = useState("");
    const timer = useRef(null);

    const changeHandler = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <StyledSearchBox
            disableUnderline
            placeholder="Search..."
            value={searchString}
            onChange={changeHandler}
            startAdornment={<BsSearch />}
        />
    );
};

export default ContactSearch;
