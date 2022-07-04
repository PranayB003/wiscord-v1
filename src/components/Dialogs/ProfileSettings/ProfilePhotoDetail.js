import React, { useState } from "react";

import {
    Typography,
    Avatar,
    Skeleton,
    Badge,
    IconButton,
    styled,
} from "@mui/material";
import { FlexDiv } from "./ProfileDetailItem";
import { BsCamera } from "react-icons/bs";
import ImageSelectDialog from "./ImageSelectDialog";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
        backgroundColor: theme.palette.secondary.light,
    },
}));

const ProfilePhotoDetail = ({
    displayName,
    photoURL,
    updateHandler,
    loading,
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const openHandler = () => {
        setDialogOpen(true);
    };
    const closeHandler = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <FlexDiv>
                {loading ? (
                    <Skeleton variant="circular" width={80} height={80} />
                ) : (
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        badgeContent={
                            <StyledIconButton
                                size="small"
                                onClick={openHandler}
                            >
                                <BsCamera />
                            </StyledIconButton>
                        }
                    >
                        <Avatar
                            alt={displayName}
                            src={photoURL}
                            sx={{ width: "80px", height: "80px" }}
                        />
                    </Badge>
                )}
                <Typography
                    variant="h6"
                    fontWeight={700}
                    color="text.primary"
                    position="relative"
                    flexGrow="1"
                    paddingLeft="10px"
                    display="flex"
                    justifyContent="flex-end"
                >
                    {loading ? <Skeleton width="50%" /> : displayName}
                </Typography>
            </FlexDiv>
            <ImageSelectDialog
                onClose={closeHandler}
                open={dialogOpen}
                onUpdate={updateHandler}
            />
        </>
    );
};

export default ProfilePhotoDetail;
