import React, { useContext } from "react";

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
import LoadingIndicator from "../LoadingIndicator";

const ContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#36393E",
    display: "flex",
    flexDirection: "column",
    height: "96vh",
    overflow: "hidden",
    padding: "2vh 15px",
}));

const ChatRoom = () => {
    const { db, auth } = useContext(FirebaseContext);
    const globalChatRef = collection(db, "globalChat");
    const chatQuery = query(
        globalChatRef,
        orderBy("createdAt", "asc"),
        limit(50)
    );
    const [data, loading, error] = useCollectionData(chatQuery, {
        idField: "id",
    });

    console.log(auth);

    const messageSubmitHandler = (newMessage, timeNow) => {
        console.log(newMessage);
        const newDocData = {
            body: newMessage,
            createdAt: Timestamp.fromDate(timeNow),
            phoneNumber: auth.currentUser.phoneNumber,
            uid: auth.currentUser.uid,
        };
        addDoc(globalChatRef, newDocData);
    };

    return (
        <ContainerBox>
            <LoadingIndicator isLoading={loading} />
            <Stack
                spacing={2}
                flexGrow={1}
                overflow="auto"
                paddingBottom="10px"
            >
                {data &&
                    data.map((doc, index) => {
                        const { body, createdAt, phoneNumber } = doc;
                        const dateObj = new Date(createdAt.seconds * 1000);
                        const sender =
                            auth.currentUser.phoneNumber === phoneNumber
                                ? "me"
                                : auth.currentUser.phoneNumber;
                        console.log(doc);
                        // console.log(doc.id);

                        return (
                            <ChatMessage
                                body={body}
                                time={dateObj}
                                from={sender}
                                key={index}
                            />
                        );
                    })}
            </Stack>
            <MessageInput onSubmit={messageSubmitHandler} />
        </ContainerBox>
    );
};

export default ChatRoom;
