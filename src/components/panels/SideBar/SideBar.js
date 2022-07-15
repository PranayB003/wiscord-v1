import React from "react";

import { Box, Drawer, SwipeableDrawer } from "@mui/material";
import ChannelPanel from "./ChannelPanel";
import ServerPanel from "./ServerPanel";

const ModalProps = {
    keepMounted: true,
};

const SideBar = ({ open, onOpen, onClose, isMobile, width }) => {
    const serverPanelWidth = 50;
    const channelPanelWidth = isMobile
        ? `calc(100vw - 100px)`
        : `${width - serverPanelWidth}px`;

    const Content = (
        <Box display="flex">
            <ServerPanel width={serverPanelWidth} />
            <ChannelPanel
                category={"Direct Messaging"}
                isMobile={isMobile}
                width={channelPanelWidth}
                leftOffset={serverPanelWidth}
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
