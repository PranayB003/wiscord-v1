import React from "react";

import { styled, Box, AppBar, Toolbar, Typography } from "@mui/material";
import useChatRoom from "../../../hooks/useChatRoom";
import DMContent from "./DMContent";
import GlobalContent from "./GlobalContent";

const ChannelPanelBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkestGray,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",

    // ScrollBar
    "&": {
        scrollbarWidth: "thin",
        scrollbarColor: "rgb(113, 113, 113) transparent",
    },
    "& *::-webkit-scrollbar": {
        width: "2px",
    },
    "& *::-webkit-scrollbar-track": {
        background: "transparent",
    },
    "& *::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(80, 80, 80)",
        borderRadius: "0px",
    },
}));

const defaultChannels = {
    __global__: <GlobalContent />,
    __direct__: <DMContent />,
};

const ChannelPanel = ({ isMobile, width, leftOffset }) => {
    const [state] = useChatRoom();

    return (
        <ChannelPanelBox width={width}>
            <AppBar
                position="fixed"
                sx={{
                    width: width,
                    left: "0",
                    top: "0",
                    ml: isMobile ? `${leftOffset}px` : "0px",
                }}
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
                        {state.server.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            {isMobile && <Toolbar />}
            <Box
                padding="10px"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                maxHeight="85vh"
            >
                {defaultChannels[state.server.id]}
            </Box>
        </ChannelPanelBox>
    );
};

export default ChannelPanel;
