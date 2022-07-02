import React, { useState } from "react";

import { Backdrop, Stack, styled, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import GlobalChatRoom from "../components/Messaging/GlobalChatRoom";
import SideBar from "../components/SideBar";
import TopAppBar from "../components/TopAppBar";

const WrapperStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkerGray,
    height: "100vh",
    paddingTop: "2px",
}));

const MainContentStack = styled(Stack)(({ theme }) => ({
    flexGrow: "1",
    maxHeight: "100vh",
    overflow: "hidden",
}));

const WrapperPage = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <>
            {isMobile && (
                <Backdrop
                    open={sideBarOpen}
                    onClick={() => setSideBarOpen(false)}
                >
                    <Typography color="#FFFFFF">LMAO LMAO LMAO</Typography>
                    <SideBar />
                </Backdrop>
            )}
            <WrapperStack direction="row" spacing={1}>
                {!isMobile && <SideBar />}
                <MainContentStack>
                    <TopAppBar
                        title="Global Chat"
                        onMenuOpen={() => setSideBarOpen(true)}
                    />
                    <GlobalChatRoom />
                </MainContentStack>
            </WrapperStack>
        </>
    );
};

export default WrapperPage;
