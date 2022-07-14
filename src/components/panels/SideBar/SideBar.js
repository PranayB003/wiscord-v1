import React, { useState } from "react";

import { Box, Drawer, SwipeableDrawer } from "@mui/material";
import MainPanel from "./MainPanel";
import CategoryPanel from "./CategoryPanel";

const ModalProps = {
    keepMounted: true,
};

const SideBar = ({ open, onOpen, onClose, isMobile, width }) => {
    const [category, setCategory] = useState("Global Server");

    const categoryPanelWidth = 50;
    const mainPanelWidth = isMobile
        ? `calc(100vw - 100px)`
        : `${width - categoryPanelWidth}px`;

    const Content = (
        <Box display="flex">
            <CategoryPanel width={categoryPanelWidth} onChange={setCategory} />
            <MainPanel
                category={category}
                isMobile={isMobile}
                width={mainPanelWidth}
                leftOffset={categoryPanelWidth}
            />
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
