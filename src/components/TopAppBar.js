import React, { useState } from "react";

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
import { FiMenu } from "react-icons/fi";
const TopAppBar = ({
    auth,
    title,
    onMenuOpen,
    accountOptions,
    isMobile,
    sideBarWidth,
}) => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: isMobile ? "100%" : `calc(100% - ${sideBarWidth}px)`,
                    ml: isMobile ? "0" : `${sideBarWidth}px`,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {isMobile && (
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
                        )}
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "inherit",
                                textAlign: {
                                    xs: "left",
                                    sm: "center",
                                },
                            }}
                        >
                            {title}
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Options">
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
                                {accountOptions.map((option) => (
                                    <MenuItem
                                        key={option.name}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            option.action();
                                        }}
                                    >
                                        <ListItemIcon>
                                            {option.icon}
                                        </ListItemIcon>
                                        <ListItemText>
                                            {option.name}
                                        </ListItemText>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </>
    );
};
export default TopAppBar;
