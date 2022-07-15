import React, { useState, useContext } from "react";

import { FirebaseContext } from "../App";
import { signOut } from "firebase/auth";

import { Stack, styled } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CgProfile } from "react-icons/cg";
import { IoPower } from "react-icons/io5";

import { ChatContextProvider } from "../hooks/useChatRoom";
import SideBar from "../components/panels/SideBar/SideBar";
import TopAppBar from "../components/panels/TopAppBar";
import ChatRoom from "../components/Messaging/ChatRoom";
import ConfirmDialog from "../components/Dialogs/ConfirmDialog";
import ProfileSettingsDialog from "../components/Dialogs/ProfileSettings/ProfileSettingsDialog";
import DisplayNameInput from "../components/Dialogs/ProfileSettings/DisplayNameInput";

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
    const isMobile = useMediaQuery("(max-width:770px)");
    const { auth, db } = useContext(FirebaseContext);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    const openSideBar = () => {
        setSideBarOpen(true);
    };
    const closeSideBar = () => {
        setSideBarOpen(false);
    };

    const toggleProfileDialog = () => {
        setProfileDialogOpen((value) => !value);
    };
    const toggleLogoutDialog = () => {
        setConfirmDialogOpen((value) => !value);
    };
    const logoutConfirmHandler = () => {
        setConfirmDialogOpen(false);
        signOut(auth);
    };

    const accountOptions = [
        {
            name: "Profile",
            icon: <CgProfile />,
            action: toggleProfileDialog,
        },
        {
            name: "Log Out",
            icon: <IoPower />,
            action: toggleLogoutDialog,
        },
    ];

    const sideBarWidth = 320;

    return (
        <ChatContextProvider>
            <WrapperStack direction="row">
                <SideBar
                    open={sideBarOpen}
                    onOpen={openSideBar}
                    onClose={closeSideBar}
                    isMobile={isMobile}
                    width={sideBarWidth}
                />
                <MainContentStack>
                    <TopAppBar
                        auth={auth}
                        onMenuOpen={openSideBar}
                        accountOptions={accountOptions}
                        isMobile={isMobile}
                        sideBarWidth={sideBarWidth}
                    />
                    <ChatRoom currentUID={auth.currentUser.uid} db={db} />
                </MainContentStack>
            </WrapperStack>
            <DisplayNameInput auth={auth} />
            <ConfirmDialog
                open={confirmDialogOpen}
                onClose={toggleLogoutDialog}
                onConfirm={logoutConfirmHandler}
                display={{
                    title: "Log Out?",
                    message: "Are you sure you want to log out?",
                }}
            />
            <ProfileSettingsDialog
                open={profileDialogOpen}
                onClose={toggleProfileDialog}
                onLogout={toggleLogoutDialog}
            />
        </ChatContextProvider>
    );
};

export default WrapperPage;
// todo: DM UI with indicator for currently active chat
// todo: navigation between DMs and Global Chat
