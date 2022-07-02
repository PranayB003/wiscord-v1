import React, { useState, useContext } from "react";

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Container,
    Avatar,
    Tooltip,
} from "@mui/material";

import { FirebaseContext } from "../App";
import { signOut } from "firebase/auth";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoPower } from "react-icons/io5";
import LogoutDialog from "./Dialogs/LogoutDialog";
import ProfileSettingsDialog from "./Dialogs/ProfileSettings/ProfileSettingsDialog";

const options = ["Profile", "Logout"];
const optionIcons = {
    Profile: <CgProfile />,
    Logout: <IoPower />,
};

const TopAppBar = ({ title, onMenuOpen }) => {
    const { auth } = useContext(FirebaseContext);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const optionClickHandler = (option) => {
        if (option === "Logout") setLogoutDialogOpen(true);
        else if (option === "Profile") setProfileDialogOpen(true);
        handleCloseUserMenu();
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", sm: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={onMenuOpen}
                                color="inherit"
                            >
                                <FiMenu />
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "inherit",
                            }}
                        >
                            {title}
                        </Typography>
                        {/* <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box> */}

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Account Options">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={auth.currentUser.displayName}
                                        src={auth.currentUser.photoURL}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {options.map((option) => (
                                    <MenuItem
                                        key={option}
                                        onClick={() =>
                                            optionClickHandler(option)
                                        }
                                    >
                                        <ListItemIcon>
                                            {optionIcons[`${option}`]}
                                        </ListItemIcon>
                                        {/* <Typography textAlign="center"> */}
                                        <ListItemText>{option}</ListItemText>
                                        {/* </Typography> */}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
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
export default TopAppBar;
