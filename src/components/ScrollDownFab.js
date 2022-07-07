import React from "react";

import { Fab, Zoom, styled } from "@mui/material";
import { HiChevronDoubleDown } from "react-icons/hi";

const StyledFab = styled(Fab)(({ theme }) => ({
    position: "absolute",
    bottom: "15px",
    right: "15px",
    backgroundColor: theme.palette.background.gray,
    color: "white",
    width: "35px",
    height: "35px",
    minHeight: "35px",
    "&::after": {
        position: "absolute",
        top: -1,
        left: -1,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        content: '""',
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
            border: `2px solid ${theme.palette.background.gray}`,
        },
        "100%": {
            transform: "scale(1.3)",
            opacity: 0,
            border: `1px solid ${theme.palette.background.gray}`,
        },
    },
}));

const ScrollDownFab = ({ show, onClick }) => {
    return (
        <div style={{ position: "relative" }}>
            <Zoom in={show} unmountOnExit>
                <StyledFab aria-label="scroll down" onClick={onClick}>
                    <HiChevronDoubleDown />
                </StyledFab>
            </Zoom>
        </div>
    );
};

export default ScrollDownFab;
