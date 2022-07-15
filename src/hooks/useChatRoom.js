import React, { useReducer, useContext } from "react";

import { auth, db } from "../App";
import { collection } from "firebase/firestore";
import messageConverter from "../utils/messageConverter";

const initFunction = ({ auth, db }) => {
    const globalChatRef = collection(db, "globalChat").withConverter(
        messageConverter
    );
    const phoneNumber = `${auth.currentUser.phoneNumber.slice(0, -2)}XX`;

    return {
        server: {
            id: "__global__",
            name: "Global Server",
        },
        channel: {
            id: "chatroom",
            name: "Global Chat",
        },
        chat: {
            collectionRef: globalChatRef,
            senderID: phoneNumber,
            showSender: true,
        },
    };
};

const chatReducer = (oldState, action) => {
    const displayName = auth.currentUser.displayName;
    const phoneNumber = `${auth.currentUser.phoneNumber.slice(0, -2)}XX`;

    if (action.type === "server") {
        const server = action.payload.server;
        if (server.id === oldState.server.id) {
            return oldState;
        } else if (server.id === "__global__") {
            return {
                ...initFunction({ auth, db }),
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
                    showSender: false,
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
                    collectionRef:
                        action.payload.chat.collectionRef?.withConverter(
                            messageConverter
                        ),
                    senderID:
                        oldState.server.id === "__global__"
                            ? phoneNumber
                            : displayName,
                    showSender: action.payload.chat.showSender || false,
                },
            };
        }
    } else {
        console.log("Invalid chatRoom action: " + action.type);
        return oldState;
    }
};

export const ChatRoomContext = React.createContext();
export const ChatContextProvider = (props) => {
    const [state, dispatch] = useReducer(
        chatReducer,
        { auth, db },
        initFunction
    );

    return (
        <ChatRoomContext.Provider value={[state, dispatch]}>
            {props.children}
        </ChatRoomContext.Provider>
    );
};

export default function useChatRoom() {
    const chatContext = useContext(ChatRoomContext);
    return chatContext;
}
