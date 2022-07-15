import React, { useState, useRef, useCallback, useEffect } from "react";

import { Stack, LinearProgress, Typography } from "@mui/material";
import ContactCard from "./ContactCard";
import ContactSearch from "./ContactSearch";
import searchUsers from "../../../functions/searchUsers";
import getConversations from "../../../functions/getConversations";

const DMContent = () => {
    const [searchString, setSearchString] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(undefined);
    const searchTimer = useRef(null);
    const [convLoading, setConvLoading] = useState(true);
    const [conversations, setConversations] = useState(undefined);

    const chat = useRef(null);
    const setChatRef = (value) => {
        chat.current = value;
    };
    const getChatRef = () => {
        return chat.current;
    };

    let convIDmap = {};
    conversations?.forEach((convo) => {
        convIDmap[convo.user.uid] = convo.convID;
    });

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

    return (
        <>
            <ContactSearch
                value={searchString}
                onChange={changeHandler}
                onClear={clearHandler}
            />
            <Stack
                marginTop="13px"
                flexGrow={1}
                overflow="auto"
                paddingInline="2px"
                spacing="5px"
            >
                {searchLoading ? (
                    <LinearProgress />
                ) : searchResults ? (
                    searchResults.length > 0 ? (
                        convLoading ? (
                            <LinearProgress />
                        ) : (
                            searchResults.map((user) => (
                                <ContactCard
                                    key={user.uid}
                                    convID={convIDmap[user.uid]}
                                    user={user}
                                    selected={getChatRef}
                                    onClick={setChatRef}
                                />
                            ))
                        )
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
                                    convID={convo.convID}
                                    user={convo.user}
                                    selected={getChatRef}
                                    onClick={setChatRef}
                                />
                            ))}
                        {!convLoading && !conversations?.length && (
                            <Typography>No conversations to show.</Typography>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
};

export default DMContent;
