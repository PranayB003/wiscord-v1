import React from "react";

import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.gray,
    minWidth: "200px",
    maxWidth: "280px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
}));

const SideBar = () => {
    return <StyledBox></StyledBox>;
};

export default SideBar;
