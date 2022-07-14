import React, { useState, useRef, useEffect, useCallback } from "react";

import {
    AppBar,
    Box,
    Drawer,
    LinearProgress,
    Stack,
    styled,
    SwipeableDrawer,
    Toolbar,
    Typography,
} from "@mui/material";
import ContactSearch from "./ContactSearch";
import ContactCard from "./ContactCard";
import searchUsers from "./../../../functions/searchUsers";
import getConversations from "./../../../functions/getConversations";

const StyledBox = styled(Box)(({ theme }) => ({
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

const ModalProps = {
    keepMounted: true,
};

const SideBar = ({ open, onOpen, onClose, isMobile, sideBarWidth }) => {
    const [searchString, setSearchString] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(undefined);
    const searchTimer = useRef(null);
    const [convLoading, setConvLoading] = useState(true);
    const [conversations, setConversations] = useState(undefined);

    const convQueryHandler = useCallback(async () => {
        setConvLoading(true);
        try {
            const data = await getConversations();
            setConversations(data);
        } catch (error) {
            console.error(error);
        } finally {
            setConvLoading(false);
        }
    }, []);

    const changeHandler = (event) => {
        setSearchString(event.target.value);
    };
    const clearHandler = useCallback(() => {
        setSearchString("");
        setSearchLoading(false);
        setSearchResults(undefined);
        convQueryHandler();
    }, [convQueryHandler]);

    useEffect(() => {
        convQueryHandler();
    }, [convQueryHandler]);

    useEffect(() => {
        if (searchTimer.current) {
            clearTimeout(searchTimer.current);
        }
        let outdated = false;

        if (searchString.trim()) {
            setSearchLoading(true);
            searchTimer.current = setTimeout(async () => {
                try {
                    const result = await searchUsers(searchString);
                    if (!outdated) {
                        setSearchResults(result.docs.map((doc) => doc.data()));
                        setSearchLoading(false);
                    }
                } catch (error) {
                    clearHandler();
                    console.error(error);
                }
            }, 500);
        } else {
            clearHandler();
        }

        return () => {
            outdated = true;
        };
    }, [searchTimer, searchString, clearHandler]);

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
            <Box
                padding="10px"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                maxHeight="85vh"
            >
                <ContactSearch
                    value={searchString}
                    onChange={changeHandler}
                    onClear={clearHandler}
                />
                <Stack
                    marginTop="13px"
                    flexGrow={1}
                    overflow="auto"
                    paddingRight="2px"
                    spacing="5px"
                >
                    {searchLoading ? (
                        <LinearProgress />
                    ) : searchResults ? (
                        searchResults.length > 0 ? (
                            searchResults.map((user) => (
                                <ContactCard key={user.uid} user={user} />
                            ))
                        ) : (
                            <Typography width="100%" textAlign="center">
                                No users found.
                            </Typography>
                        )
                    ) : (
                        <>
                            {convLoading && <LinearProgress />}
                            {conversations?.length > 0 &&
                                conversations.map((convo) => (
                                    <ContactCard
                                        key={convo.user.uid}
                                        user={convo.user}
                                    />
                                ))}
                            {!convLoading && !conversations?.length && (
                                <Typography>
                                    Start a conversation by searching for users
                                    using their display name.
                                </Typography>
                            )}
                        </>
                    )}
                </Stack>
            </Box>
        </StyledBox>
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
