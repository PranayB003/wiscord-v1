import React from "react";

import { Box, Drawer, styled, SwipeableDrawer } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkestGray,
    // width: "260px",
    height: "100%",
}));

const ModalProps = {
    keepMounted: true,
};

const SideBar = ({ open, onOpen, onClose, isMobile, sideBarWidth }) => {
    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const sideContent = (
        <StyledBox sx={{ width: `${sideBarWidth}px` }}>hehe</StyledBox>
    );

    return isMobile ? (
        <SwipeableDrawer
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            disableDiscovery={true}
            disableBackdropTransition={!iOS}
            ModalProps={ModalProps}
        >
            {sideContent}
        </SwipeableDrawer>
    ) : (
        <Drawer
            variant="permanent"
            ModalProps={ModalProps}
            sx={{ "& .MuiPaper-root": { position: "static" } }}
        >
            {sideContent}
        </Drawer>
    );
};

export default SideBar;
// todo: search bar UI
// todo: search results UI
