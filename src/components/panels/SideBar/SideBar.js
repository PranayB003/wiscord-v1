import React from "react";

import {
    AppBar,
    Box,
    Drawer,
    styled,
    SwipeableDrawer,
    Toolbar,
    Typography,
} from "@mui/material";
import ContactSearch from "./ContactSearch";
import ContactCard from "./ContactCard";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkestGray,
    height: "100%",
}));

const ModalProps = {
    keepMounted: true,
};

const SideBar = ({ open, onOpen, onClose, isMobile, sideBarWidth }) => {
    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const Content = (
        <StyledBox width={`${sideBarWidth}px`}>
            <AppBar
                position="fixed"
                sx={{ width: `${sideBarWidth}px`, left: "0", top: "0" }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            width: "100%",
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textAlign: "center",
                        }}
                    >
                        Direct Messaging
                    </Typography>
                </Toolbar>
            </AppBar>
            {isMobile && <Toolbar />}
            <Box padding="10px">
                <ContactSearch />
                <Box marginTop="13px"></Box>
            </Box>
        </StyledBox>
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
// todo: search functionality
// todo: get previously active DMs
