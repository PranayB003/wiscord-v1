import React, { useContext } from "react";

import { collection } from "firebase/firestore";
import { FirebaseContext } from "../../../App";

import { Avatar, Typography, styled, Button } from "@mui/material";
import useChatRoom from "../../../hooks/useChatRoom";

const CardContainer = styled(Button, {
    shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
    columnGap: "10px",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "5px",
    backgroundColor: active ? theme.palette.background.gray : "transparent",
}));

const ContactCard = ({ user, convID }) => {
    const { db } = useContext(FirebaseContext);
    const [state, dispatch] = useChatRoom();

    const clickHandler = () => {
        const collectionRef = convID
            ? collection(db, "directMessages", convID, "messages")
            : null;

        dispatch({
            type: "channel",
            payload: {
                channel: {
                    id: user.uid,
                    name: user.displayName,
                },
                chat: {
                    collectionRef: collectionRef,
                },
            },
        });
    };

    return (
        <CardContainer
            fullWidth
            onClick={clickHandler}
            active={state.channel.id === user.uid}
        >
            <Avatar
                alt={user.displayName}
                src={user.photoURL}
                sx={{ width: "35px", height: "35px" }}
            />
            <Typography
                fontWeight={600}
                color="disabled.main"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                textTransform="none"
            >
                {user.displayName || user.phoneNumber}
            </Typography>
        </CardContainer>
    );
};

export default ContactCard;
