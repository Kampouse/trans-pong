import { MenuItem } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import React from "react";

import { ChooseSentenceTimePopup } from "./ChooseSentenceTimePopup";
import { WebsocketContext } from "context/WebSocketContext";
import { RoomDto } from "api/chat.api";
import { User} from '@prisma/client';

enum Sentence {
    none = -1,
    ban = 0,
    mute = 1
}

interface BanMuteButtonProps {
    user: User,
    room: RoomDto,
    handleClose: any
}

export const BanMuteButton = ({
    user,
    room,
    handleClose
}: BanMuteButtonProps) => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [sentence, setSentence] = React.useState<Sentence>(Sentence.none);
    const [time, setTime] = React.useState<number>(-1);
    const socket = React.useContext(WebsocketContext);

    const handleBan = () => {
        setSentence(Sentence.ban);
        setOpen(true);
        handleClose();
    };

    const handleMute = () => {
        setSentence(Sentence.mute);
        setOpen(true);
        handleClose();
    };

    const handleSentence = () => {
        if (sentence === Sentence.ban && time !== -1) {
            socket.emit('banUser', {roomName: room.roomName, userId: user.userID, time: time})
        }
        if (sentence === Sentence.mute && time !== -1) {
            socket.emit('muteUser', {roomName: room.roomName, userId: user.userID, time: time})
        }
        setOpen(false);
        setSentence(Sentence.none);
        setTime(-1);
    }

    return (
        <>
        <MenuItem onClick={handleBan}><DangerousIcon/><p style={{ marginLeft: "15px" }} >Ban user</p></MenuItem>
        <MenuItem onClick={handleMute}><VolumeOffIcon/><p style={{ marginLeft: "15px" }} >Mute user</p></MenuItem>
        <ChooseSentenceTimePopup 
            open={open}
            setOpen={setOpen}
            sentence={sentence}
            handleSentence={handleSentence}
            userName={user.username}
            setTime={setTime}
        />
        </>
    )
}