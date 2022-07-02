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
    backgroundColor: theme.palette.background.lightGray,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "10px 12px",
    flexGrow: "1",
}));

const GlobalChatRoom = () => {
    const { db, auth } = useContext(FirebaseContext);
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
                        const { body, createdAt, phoneNumber, uid } = doc;
                        const dateObj = new Date(createdAt.seconds * 1000);
                        const sender =
                            auth.currentUser.uid === uid ? "me" : phoneNumber;
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

export default GlobalChatRoom;
