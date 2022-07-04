import React, { useContext, useEffect, useRef } from "react";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../App";

import { Box, Divider, Stack, styled } from "@mui/material";

import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import FullscreenCircularLoadingIndicator from "../FullscreenCircularLoadingIndicator";
import messageConverter from "../../utils/messageConverter";
import getDateWise from "../../utils/getDateWise";
import getFormattedDate from "../../utils/getFormattedDate";
import sameDayOfYear from "../../utils/sameDayOfYear";

const ContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.lightGray,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    paddingBlock: "10px",
    flexGrow: "1",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
    flexGrow: "1",
    overflow: "auto",
    marginBottom: "10px",
    paddingInline: "12px",
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    "& .time-content": {
        position: "relative",
        top: "10px",
        ...theme.typography.body2,
        fontWeight: "bold",
        color: theme.palette.disabled.main,
    },
}));

const GlobalChatRoom = () => {
    /* TODO: Set a better color for incoming messages */
    /* TODO: Include image avatar beside message box */
    console.log("rendered");
    const { db, auth } = useContext(FirebaseContext);
    const messageListRef = useRef(null);

    const globalChatRef = collection(db, "globalChat").withConverter(
        messageConverter
    );
    const chatQuery = query(
        globalChatRef,
        orderBy("createdAt", "asc"),
        limit(50)
    );
    const [data, loading] = useCollectionData(chatQuery);

    const messageSubmitHandler = async (newMessage) => {
        const userPhoneNumber = auth.currentUser.phoneNumber;
        const newDocData = {
            body: newMessage,
            createdAt: serverTimestamp(),
            phoneNumber: `${userPhoneNumber.slice(
                0,
                3
            )} ${userPhoneNumber.slice(3, 11)}XX`,
            uid: auth.currentUser.uid,
        };
        const res = await addDoc(globalChatRef, newDocData);
        console.log(res);
    };

    useEffect(() => {
        const children = messageListRef.current.children;
        const lastChildElement = children[children.length - 1];
        if (lastChildElement) {
            lastChildElement.scrollIntoView({
                behaviour: "smooth",
            });
        }
    }, [data]);

    const chatData = data ? getDateWise(data) : undefined;
    console.log(chatData);

    // FIXMe: fix null-date behaviour on message send

    return (
        <ContainerBox>
            <FullscreenCircularLoadingIndicator isLoading={loading} />
            <StyledStack spacing={2} ref={messageListRef}>
                {data &&
                    chatData.map((messages) => {
                        const date = new Date(
                            messages[0].createdAt.seconds * 1000
                        );
                        const formattedDate = sameDayOfYear(new Date(), date)
                            ? "Today"
                            : getFormattedDate(date);

                        const messagesJSX = messages.map((message) => {
                            const { id, body, createdAt, phoneNumber, uid } =
                                message;
                            const dateObj = new Date(createdAt * 1000);
                            const sender =
                                auth.currentUser.uid === uid
                                    ? "me"
                                    : phoneNumber;

                            return (
                                <ChatMessage
                                    body={body}
                                    time={dateObj}
                                    from={sender}
                                    key={id}
                                />
                            );
                        });

                        return (
                            <>
                                <StyledDivider>
                                    <span className="time-content">
                                        {formattedDate}
                                    </span>
                                </StyledDivider>
                                {messagesJSX}
                            </>
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
