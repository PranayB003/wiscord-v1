import React from "react";

import { Box, Drawer, styled, SwipeableDrawer } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.gray,
    minWidth: "200px",
    maxWidth: "280px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
}));

const ModalProps = {
    keepMounted: true,
};

const SideBar = ({ open, onOpen, onClose }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    // return <StyledBox></StyledBox>;
    return isMobile ? (
        <SwipeableDrawer
            anchor="left"
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            ModalProps={ModalProps}
        />
    ) : (
        <Drawer variant="permanent" anchor="left" ModalProps={ModalProps} />
    );
};

export default SideBar;
