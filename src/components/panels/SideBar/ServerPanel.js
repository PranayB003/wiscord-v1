import React from "react";

import { styled, Stack, IconButton } from "@mui/material";
import { FaGlobeAsia } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import useChatRoom from "../../../hooks/useChatRoom";

const ServerPanelStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "width",
})(({ width, theme }) => ({
    width: `${width}px`,
    backgroundColor: theme.palette.background.darkGray,
    paddingBlock: "5px",
    alignItems: "center",
}));

const defaultServers = [
    {
        id: "__global__",
        name: "Global Server",
        icon: FaGlobeAsia,
    },
    {
        id: "__direct__",
        name: "Direct Messaging",
        icon: BsChatDotsFill,
    },
];

const ServerPanel = ({ width }) => {
    const [state, dispatch] = useChatRoom();

    const clickHandlerFactory = (serverObject) => () => {
        dispatch({
            type: "server",
            payload: {
                server: {
                    id: serverObject.id,
                    name: serverObject.name,
                },
            },
        });
    };

    return (
        <ServerPanelStack width={width} spacing="1px">
            {defaultServers.map((server) => (
                <IconButton
                    key={server.id}
                    color={
                        server.id === state.server.id ? "secondary" : "primary"
                    }
                    sx={{ height: `${width - 4}px`, width: `${width - 4}px` }}
                    onClick={clickHandlerFactory(server)}
                >
                    <server.icon />
                </IconButton>
            ))}
        </ServerPanelStack>
    );
};

export default ServerPanel;
