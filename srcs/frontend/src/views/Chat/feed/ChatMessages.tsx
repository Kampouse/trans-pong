import { styled, Typography } from "@mui/material";
import { MessageDto, RoomDto } from "api/chat.api";
import { UserContext } from "Router/Router";
import React from "react";
import { User } from '@prisma/client';

const RecvMessage = styled('div')(({ theme }) => ({
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: '10px',
    padding: "5px 10px",
    margin: '15px 200px 15px 20px',
}));

const SendMessage = styled('div')(({ theme }) => ({
    backgroundColor: 'purple',
    color: 'white',
    borderRadius: '10px',
    padding: "5px 10px",
    margin: '15px 20px 15px 200px',
}));

interface ChatMessagesProps {
    room: RoomDto
}

export const ChatMessages = ({
    room
}: ChatMessagesProps) => {

    const user: User | null = React.useContext(UserContext);

    return (
        <>
        {room.messages.map((message: MessageDto, index: number) => {
        return (
            <div key={index}>
            { 
            user?.userID === message.userID?

            <SendMessage>
            <Typography className="sender" style={{backgroundColor: "background.paper"}} >
                <strong>Moi</strong>
            </Typography> 
            <Typography className="message" style={{wordWrap: "break-word", backgroundColor: "background.paper"}} >{message.message}</Typography> 
            </SendMessage>

            : !user?.blocked?.find(({userID}) => message.userID === userID) ?
            
            <RecvMessage>
            <Typography className="sender" style={{backgroundColor: "background.paper"}} >
                <strong>{message.userName}</strong>
            </Typography> 
            <Typography className="message" style={{wordWrap: "break-word", backgroundColor: "background.paper"}} >{message.message}</Typography> 
            </RecvMessage>
            : 
            null
            }
            </div>
        );
        })}
        </>
    )

}