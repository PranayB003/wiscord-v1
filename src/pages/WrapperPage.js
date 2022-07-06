import React, { useState, useContext } from "react";

import { FirebaseContext } from "../App";
import { signOut } from "firebase/auth";

import { Stack, styled } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { CgProfile } from "react-icons/cg";
import { IoPower } from "react-icons/io5";

import GlobalChatRoom from "../components/Messaging/GlobalChatRoom";
// import SideBar from "../components/SideBar";
import TopAppBar from "../components/TopAppBar";
import ConfirmDialog from "../components/Dialogs/ConfirmDialog";
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
    // const isMobile = useMediaQuery("(max-width:600px)");
    const { auth } = useContext(FirebaseContext);
    // const [sideBarOpen, setSideBarOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

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

    return (
        <>
            {/* {isMobile && (
                <Backdrop
                    open={sideBarOpen}
                    onClick={() => setSideBarOpen(false)}
                >
                    <SideBar />
                </Backdrop>
            )} */}
            <WrapperStack direction="row">
                {/* {!isMobile && <SideBar />} */}
                <MainContentStack>
                    <TopAppBar
                        auth={auth}
                        title="Global Chat"
                        onMenuOpen={() => {
                            // setSideBarOpen(true)
                        }}
                        accountOptions={accountOptions}
                    />
                    <GlobalChatRoom />
                </MainContentStack>
            </WrapperStack>
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
        </>
    );
};

export default WrapperPage;
