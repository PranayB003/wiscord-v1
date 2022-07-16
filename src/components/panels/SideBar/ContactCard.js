import React, { useContext, useRef, useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "../../../App";

import {
    Avatar,
    Typography,
    styled,
    Button,
    LinearProgress,
} from "@mui/material";
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

const ContactCard = ({ user, convID, selected, onClick }) => {
    const { auth, db } = useContext(FirebaseContext);
    const [state, dispatch] = useChatRoom();
    const [loading, setLoading] = useState(false);
    const collectionRef = useRef(
        convID ? collection(db, "directMessages", convID, "messages") : null
    );

    const clickHandler = async () => {
        onClick(user.uid);

        if (!collectionRef.current) {
            setLoading(true);
            try {
                const docRef = await addDoc(collection(db, "directMessages"), {
                    participants: [auth.currentUser.uid, user.uid],
                });
                collectionRef.current = collection(docRef, "messages");
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (selected() !== user.uid) {
            return;
        }

        dispatch({
            type: "channel",
            payload: {
                server: state.server,
                channel: {
                    id: user.uid,
                    name: `@${user.displayName?.trim()?.replace(/ /g, "_")}`,
                },
                chat: {
                    collectionRef: collectionRef.current,
                },
            },
        });
    };

    return (
        <CardContainer
            fullWidth
            onClick={clickHandler}
            active={state.channel.id === user.uid}
            disabled={loading}
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
                {loading && <LinearProgress />}
            </Typography>
        </CardContainer>
    );
};

export default ContactCard;
