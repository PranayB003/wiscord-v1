import React, { useMemo, useRef } from "react";

import {
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
    collection,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { Box, Divider, Stack, styled } from "@mui/material";

import useChatRoom from "../../hooks/useChatRoom";
import GroupedChatMessage from "./GroupedChatMessage";
import ChatInput from "./ChatInput";
import FullscreenCircularLoadingIndicator from "../FullscreenCircularLoadingIndicator";
import useAutoScrollDown from "../../hooks/useAutoScrollDown";
import groupByTimeUser from "../../utils/groupByTimeUser";
import getFormattedDate from "../../utils/getFormattedDate";
import sameDayOfYear from "../../utils/sameDayOfYear";

const ContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.darkestGray,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    paddingBlock: "0 10px",
    flexGrow: "1",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
    flexGrow: "1",
    overflowY: "auto",
    overflowX: "hidden",
    marginBottom: "10px",
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

const ChatRoom = ({ currentUID, db }) => {
    const [state] = useChatRoom();
    const messageListRef = useRef(null);

    const chatRef = state.chat.collectionRef || collection(db, "botDMs");
    const chatQuery = query(chatRef, orderBy("createdAt", "desc"), limit(200));
    const [data, loading] = useCollectionData(chatQuery);
    const chatData = useMemo(() => groupByTimeUser(data?.reverse()), [data]);

    const [ScrollDownFab, forceScrollDown] = useAutoScrollDown(messageListRef, [
        chatData,
    ]);

    const messageSubmitHandler = async (newMessage) => {
        const newDocData = {
            body: newMessage,
            createdAt: serverTimestamp(),
            uid: currentUID,
        };
        if (state.chat.showSender) {
            newDocData.senderID = state.chat.senderID;
        }
        forceScrollDown();
        await addDoc(chatRef, newDocData);
    };

    return (
        <ContainerBox>
            {loading && (
                <FullscreenCircularLoadingIndicator isLoading={loading} />
            )}
            <StyledStack spacing={2} ref={messageListRef} paddingLeft="6px">
                {data &&
                    chatData.map((dateMessages) => {
                        const date = dateMessages[0][0].createdAt;
                        const formattedDate = sameDayOfYear(new Date(), date)
                            ? "Today"
                            : getFormattedDate(date);

                        const messagesJSX = dateMessages.map(
                            (timeUserMessages) => {
                                const sender =
                                    timeUserMessages[0].uid === currentUID
                                        ? "me"
                                        : timeUserMessages[0].senderID ||
                                          timeUserMessages[0].phoneNumber;

                                return (
                                    <GroupedChatMessage
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
            {data && <ScrollDownFab />}
            <Box sx={{ paddingInline: "12px" }}>
                <ChatInput
                    onSubmit={messageSubmitHandler}
                    disabled={!state.chat.collectionRef}
                />
            </Box>
        </ContainerBox>
    );
};

export default ChatRoom;
