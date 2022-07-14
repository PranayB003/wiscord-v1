import React from "react";

import { styled, Stack, IconButton } from "@mui/material";
import { FaGlobeAsia } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";

const CategoryPanelStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "width",
})(({ width, theme }) => ({
    width: `${width}px`,
    backgroundColor: theme.palette.background.darkGray,
    paddingBlock: "5px",
    alignItems: "center",
}));

const CategoryPanel = ({ width, onChange }) => {
    return (
        <CategoryPanelStack width={width} spacing="1px">
            <IconButton
                sx={{ height: `${width - 4}px`, width: `${width - 4}px` }}
                onClick={() => onChange("Global Server")}
            >
                <FaGlobeAsia />
            </IconButton>
            <IconButton
                sx={{ height: `${width - 4}px`, width: `${width - 4}px` }}
                onClick={() => onChange("Direct Messaging")}
            >
                <BsChatDotsFill />
            </IconButton>
        </CategoryPanelStack>
    );
};

export default CategoryPanel;