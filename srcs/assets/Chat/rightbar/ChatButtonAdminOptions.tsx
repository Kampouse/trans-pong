import { UserContext } from 'Router/Router';
import * as React from 'react';
import { WebsocketContext } from 'context/WebSocketContext';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { RoomDto } from 'api/chat.api';
import LogoutIcon from '@mui/icons-material/Logout';
import { BanMuteButton } from './BanMuteButton';
import { User } from '@prisma/client';
interface ChatButtonAdminOptionProps {
    chosenUser: User, 
    room: RoomDto | null
    handleClose: () => void
}

export const ChatButtonAdminOption = ({
    chosenUser,
    handleClose,
    room
    
}: ChatButtonAdminOptionProps) => {

  const user: User | null = React.useContext(UserContext);
  const socket = React.useContext(WebsocketContext);
  const [isChosenUserAdmin, setIsChosenUserAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (room) {
      setIsChosenUserAdmin(room.admins.find((admin) => admin === chosenUser.userID) ? true : false);
    }
  }, [room, chosenUser.userID]);

  const handleAdmin = () => {
    if (room) {
      if (!isChosenUserAdmin) {
        socket.emit('setAdmin', { roomName: room.roomName, userId: chosenUser.userID });
      }
      else {
        socket.emit('unsetAdmin', { roomName: room.roomName, userId: chosenUser.userID });
      }
    }
    handleClose();
  };

  const handleKick = () => {
    if (room) {
      socket.emit('kickUser', { roomName: room.roomName, userId: chosenUser.userID })
    }
    handleClose();
  };

  return (
    <>
              {/* ************** NEW ADMIN *************** */}
    {user && room && room.owner === user.userID &&
      <MenuItem onClick={handleAdmin}><LocalPoliceIcon/><p style={{ marginLeft: "15px" }} >{
        !isChosenUserAdmin?
        'Set as admin'
        :
        'Unset admin'
        }</p></MenuItem>
    }

    {user && room && room.admins.find((value) => value === user.userID) && room.owner !== chosenUser.userID &&
    
      <FormGroup>
      <FormControl>

        {/* ************** KICK *************** */}

        <MenuItem onClick={handleKick}><LogoutIcon/><p style={{ marginLeft: "15px" }} >Kick user</p></MenuItem>
        
        {/* ************** BAN & MUTE *************** */}

        <BanMuteButton
          user={chosenUser}
          room={room}
          handleClose={handleClose}
        />
       
      </FormControl>
    </FormGroup>
    }
    </>
  )
}