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

import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import FullscreenCircularLoadingIndicator from "../FullscreenCircularLoadingIndicator";
import messageConverter from "../../utils/messageConverter";
import groupByTimeUser from "../../utils/groupByTimeUser";
import getFormattedDate from "../../utils/getFormattedDate";
import sameDayOfYear from "../../utils/sameDayOfYear";

const ContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkestGray,
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
    /* TODO: Include image avatar beside message box */
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
        await addDoc(globalChatRef, newDocData);
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

    // const chatData = data ? groupByDate(data) : undefined;
    const chatData = data ? groupByTimeUser(data) : undefined;

    return (
        <ContainerBox>
            <FullscreenCircularLoadingIndicator isLoading={loading} />
            <StyledStack spacing={2} ref={messageListRef}>
                {data &&
                    chatData.map((dateMessages) => {
                        const date = dateMessages[0][0].createdAt;
                        const formattedDate = sameDayOfYear(new Date(), date)
                            ? "Today"
                            : getFormattedDate(date);

                        const messagesJSX = dateMessages.map(
                            (timeUserMessages) => {
                                const sender =
                                    timeUserMessages[0].uid ===
                                    auth.currentUser.uid
                                        ? "me"
                                        : timeUserMessages[0].phoneNumber;

                                return (
                                    <ChatMessages
                                        key={`sw${timeUserMessages[0].id}`}
                                        from={sender}
                                        messageList={timeUserMessages}
                                    />
                                );
                            }
                        );

                        return (
                            <React.Fragment key={formattedDate}>
                                <StyledDivider>
                                    <span className="time-content">
                                        {formattedDate}
                                    </span>
                                </StyledDivider>
                                {messagesJSX}
                            </React.Fragment>
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
