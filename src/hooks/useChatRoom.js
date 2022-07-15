import React, { useContext, useReducer } from "react";

import { auth, db } from "../App";
import { collection } from "firebase/firestore";
import messageConverter from "../utils/messageConverter";

const globalChatRef = collection(db, "globalChat").withConverter(
    messageConverter
);
const initialState = {
    server: {
        id: "global",
        name: "Global Server",
    },
    channel: {
        id: "chatroom",
        name: "Global Chat",
    },
    chat: {
        collectionRef: globalChatRef,
        senderID: `${auth.currentUser.phoneNumber.slice(0, -2)}XX`,
    },
};

const chatReducer = (oldState, action) => {
    const displayName = auth.currentUser.displayName;
    const phoneNumber = `${auth.currentUser.phoneNumber.slice(0, -2)}XX`;

    if (action.type === "server") {
        const server = action.payload.server;
        if (server.id === oldState.server.id) {
            return oldState;
        } else if (server.id === "global") {
            return {
                ...initialState,
                chat: {
                    collectionRef: globalChatRef,
                    senderID: phoneNumber,
                },
            };
        } else {
            return {
                server,
                channel: {
                    id: undefined,
                    name: "",
                },
                chat: {
                    collectionRef: undefined,
                    senderID: undefined,
                },
            };
        }
    } else if (action.type === "channel") {
        const channel = action.payload.channel;
        if (channel.id === oldState.channel.id) {
            return oldState;
        } else {
            return {
                server: oldState.server,
                channel,
                chat: {
                    collectionRef: action.payload.chat.collectionRef,
                    senderID:
                        oldState.server.id === "global"
                            ? phoneNumber
                            : displayName,
                },
            };
        }
    } else {
        console.log("Invalid chatRoom action: " + action.type);
        return oldState;
    }
};

const ChatRoomContext = React.createContext(initialState);
export const ChatContextProvider = (props) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatRoomContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ChatRoomContext.Provider>
    );
};

export default function useChatRoom() {
    const chatContext = useContext(ChatRoomContext);
    return chatContext;
}
