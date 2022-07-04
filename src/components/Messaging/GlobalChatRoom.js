import React, { useContext, useEffect, useRef } from "react";

import {
    collection,
    addDoc,
    Timestamp,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../App";
import { Box, Stack, styled } from "@mui/material";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import FullscreenCircularLoadingIndicator from "../FullscreenCircularLoadingIndicator";

const ContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.lightGray,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    paddingBlock: "10px",
    flexGrow: "1",
}));

const GlobalChatRoom = () => {
    /* TODO: Separate messages by date */
    /* TODO: Set a better color for incoming messages */
    /* TODO: Include image avatar beside message box */
    const { db, auth } = useContext(FirebaseContext);
    const messageListRef = useRef(null);

    const globalChatRef = collection(db, "globalChat");
    const chatQuery = query(
        globalChatRef,
        orderBy("createdAt", "asc"),
        limit(50)
    );
    const [data, loading] = useCollectionData(chatQuery, {
        idField: "id",
    });

    const messageSubmitHandler = (newMessage, timeNow) => {
        const userPhoneNumber = auth.currentUser.phoneNumber;
        const newDocData = {
            body: newMessage,
            createdAt: Timestamp.fromDate(timeNow),
            phoneNumber: `${userPhoneNumber.slice(
                0,
                3
            )} ${userPhoneNumber.slice(3, 11)}XX`,
            uid: auth.currentUser.uid,
        };
        addDoc(globalChatRef, newDocData);
    };

    const StyledStack = styled(Stack)(({ theme }) => ({
        flexGrow: "1",
        overflow: "auto",
        marginBottom: "10px",
        paddingInline: "12px",
    }));

    useEffect(() => {
        const children = messageListRef.current.children;
        const lastChildElement = children[children.length - 1];
        if (lastChildElement) {
            lastChildElement.scrollIntoView({
                behaviour: "smooth",
            });
        }
    }, [data]);

    return (
        <ContainerBox>
            <FullscreenCircularLoadingIndicator isLoading={loading} />
            <StyledStack spacing={2} ref={messageListRef}>
                {data &&
                    data.map((doc, index) => {
                        const { body, createdAt, phoneNumber, uid } = doc;
                        const dateObj = new Date(createdAt.seconds * 1000);
                        const sender =
                            auth.currentUser.uid === uid ? "me" : phoneNumber;

                        return (
                            <ChatMessage
                                body={body}
                                time={dateObj}
                                from={sender}
                                key={index}
                            />
                        );
                    })}
            </StyledStack>
            <Box sx={{ paddingInline: "12px" }}>
                <MessageInput onSubmit={messageSubmitHandler} />
            </Box>
        </ContainerBox>
    );
};

export default GlobalChatRoom;
