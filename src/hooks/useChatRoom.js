import React, { useContext, useReducer } from "react";

import { auth, db } from "../App";
import { collection } from "firebase/firestore";
import messageConverter from "../utils/messageConverter";

const globalChatRef = collection(db, "globalChat").withConverter(
    messageConverter
);

const userPhoneNumber = auth.currentUser.phoneNumber;
const phoneNumber = `${userPhoneNumber.slice(0, -2)}XX`;
// const userDisplayName = auth.currentUser.displayName;

const initialState = {
    sideBar: {
        category: "global",
        title: "Global Server",
        selected: "chatroom",
    },
    mainContent: {
        title: "Global Chat",
        chatCollectionRef: globalChatRef,
        senderID: phoneNumber,
    },
};

const chatReducer = (state, action) => {
    return;
};

const ChatRoomContext = React.createContext(initialState);
export const ChatContextProvider = (props) => {
    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatRoomContext.Provider
            value={{ state: chatState, dispatch: dispatch }}
        >
            {props.children}
        </ChatRoomContext.Provider>
    );
};

export default function useChatRoom() {
    const chatContext = useContext(ChatRoomContext);
    return chatContext;
}
