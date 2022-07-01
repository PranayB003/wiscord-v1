import React, { useContext } from "react";

import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../App";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import styles from "./ChatRoom.module.css";
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
    const { db, auth } = useContext(FirebaseContext);
    const globalChatRef = collection(db, "globalChat");
    const chatQuery = query(
        globalChatRef,
        orderBy("createdAt", "desc"),
        limit(50)
    );
    const [data, loading, error] = useCollectionData(chatQuery, {
        idField: "id",
    });

    return (
        <div className={styles.container}>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {data && (
                <Stack
                    spacing={2}
                    flexGrow={1}
                    overflow="auto"
                    marginX="-5vw"
                    paddingX="3vw"
                >
                    {data.map((doc, index) => {
                        const { body, createdAt, userName, uid } = doc;
                        const dateObj = new Date(createdAt.seconds * 1000);
                        console.log(doc);
                        console.log(doc.id);
                        // return (
                        //     <ChatMessage
                        //         body={body}
                        //         time={dateObj}
                        //         from={"me"}
                        //         key={index}
                        //     />
                        // );
                    })}
                </Stack>
            )}
        </div>
    );
};

export default ChatRoom;
