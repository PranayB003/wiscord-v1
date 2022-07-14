import React, { useState, useRef, useEffect, useCallback } from "react";

import { Box, Drawer, SwipeableDrawer } from "@mui/material";
import MainPanel from "./MainPanel";

const ModalProps = {
    keepMounted: true,
};

const SideBar = ({ open, onOpen, onClose, isMobile, sideBarWidth }) => {
    const categoryPanelWidth = 60;
    const mainPanelWidth = isMobile
        ? `calc(100vw - 80px)`
        : `${sideBarWidth - categoryPanelWidth}px`;

    const Content = (
        <Box display="flex">
            <Box width={`${categoryPanelWidth}px`}></Box>
            <MainPanel isMobile={isMobile} width={mainPanelWidth} />
        </Box>
    );

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    return isMobile ? (
        <SwipeableDrawer
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            disableDiscovery={true}
            disableBackdropTransition={!iOS}
            ModalProps={ModalProps}
        >
            {Content}
        </SwipeableDrawer>
    ) : (
        <Drawer
            variant="permanent"
            ModalProps={ModalProps}
            sx={{ "& .MuiPaper-root": { position: "static" } }}
        >
            {Content}
        </Drawer>
    );
};

export default SideBar;
