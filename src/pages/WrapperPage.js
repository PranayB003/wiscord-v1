import React, { useState, useContext } from "react";

import { FirebaseContext } from "../App";
import { signOut } from "firebase/auth";

import { Backdrop, Stack, styled, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CgProfile } from "react-icons/cg";
import { IoPower } from "react-icons/io5";
import GlobalChatRoom from "../components/Messaging/GlobalChatRoom";
import SideBar from "../components/SideBar";
import TopAppBar from "../components/TopAppBar";
import LogoutDialog from "../components/Dialogs/LogoutDialog";
import ProfileSettingsDialog from "../components/Dialogs/ProfileSettings/ProfileSettingsDialog";

const WrapperStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkerGray,
    height: "100vh",
}));

const MainContentStack = styled(Stack)(({ theme }) => ({
    flexGrow: "1",
    maxHeight: "100vh",
    overflow: "hidden",
}));

const WrapperPage = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const { auth } = useContext(FirebaseContext);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    const accountOptions = [
        {
            name: "Profile",
            icon: <CgProfile />,
            action: () => setProfileDialogOpen(true),
        },
        {
            name: "Logout",
            icon: <IoPower />,
            action: () => setLogoutDialogOpen(true),
        },
    ];

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
                        auth={auth}
                        title="Global Chat"
                        onMenuOpen={() => setSideBarOpen(true)}
                        accountOptions={accountOptions}
                    />
                    <GlobalChatRoom />
                </MainContentStack>
            </WrapperStack>
            <LogoutDialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                onLogout={() => {
                    setLogoutDialogOpen(false);
                    signOut(auth);
                }}
            />
            <ProfileSettingsDialog
                open={profileDialogOpen}
                onClose={() => setProfileDialogOpen(false)}
            />
        </>
    );
};

export default WrapperPage;
