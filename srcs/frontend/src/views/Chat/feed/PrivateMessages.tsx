import { styled, Typography } from "@mui/material";
import { MessageDto, PrivateMsgsDto } from "api/chat.api";
import { UserDto } from "api/dto/user.dto";
import { UserContext } from "../../../Router/Router";
import React from "react";

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

interface privateMessagesProps {
    pms: PrivateMsgsDto
}

export const PrivateMessages = ({
    pms
}: privateMessagesProps) => {

    const user: UserDto | null = React.useContext(UserContext);
    
    return (
        <>
        {pms.messages.map((message: MessageDto, index: number) => {
        return (
            <div key={index}>
            { 
            user?.id === message.userId?

            <SendMessage>
            <Typography className="sender" style={{backgroundColor: "background.paper"}} >
                <strong>Moi</strong>
            </Typography> 
            <Typography className="message" style={{wordWrap: "break-word", backgroundColor: "background.paper"}} >{message.message}</Typography> 
            </SendMessage>

            : !user?.blocked?.find(({id}) => message.userId === id) ?
            
            <RecvMessage>
            <Typography className="sender" style={{fontWeight: 600, backgroundColor: "background.paper"}} >
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