import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import Tooltip from "@mui/material/Tooltip";
import { RoomDto } from 'api/chat.api';
import { WebsocketContext } from 'context/WebSocketContext';
import { Button, MenuItem } from '@mui/material';
import { User } from '@prisma/client';
import { UserContext } from 'Router/Router';
import { ChangeRoomPwdDialog } from './ChangeRoomPwdDialog';
import  ValidationPopup  from './ValidationPopup';

export const ChatSettings = ({room}: {room: RoomDto}) => {

    const [settings, setSettings] = React.useState<null | HTMLElement>(null);
    const socket = React.useContext(WebsocketContext);
    const user: User | null = React.useContext(UserContext);

    const handleCloseSettings = () => {
      setSettings(null);
    };

    const handleOpenSettings = (event: React.MouseEvent<HTMLElement>) => {
      setSettings(event.currentTarget);
    };

    const [openValidation, setOpenValidation] = React.useState<boolean>(false);
    const [validation, setValidation] = React.useState<boolean>(false);

    const onLeaveChannelClick = () => {
        setOpenValidation(true);
    };

    React.useEffect(() => {
        if (validation) {
            socket.emit('leaveRoom', { roomName: room.roomName })
        }
      }, [validation, socket, room.roomName]);

    const [openChangePwd, setOpenChangePwd] = React.useState<boolean>(false);

    React.useEffect(() => {
        setSettings(null);
      }, [openChangePwd, openValidation]);
    
    return (
        <>
        <Box sx={{display:'flex', flexDirection: 'row-reverse', marginRight:'15px'}}>
            <Tooltip title="Settings">
                <IconButton onClick={handleOpenSettings} sx={{ p: 0 }}>
                    <SettingsIcon fontSize='large'/>
                </IconButton>
            </Tooltip>
            <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={settings}
            anchorOrigin={{
            vertical: "top",
            horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
            vertical: "top",
            horizontal: "right",
            }}
            open={Boolean(settings)}
            onClose={handleCloseSettings}
            >
                <MenuItem >
                    <Button onClick={onLeaveChannelClick}>Leave room</Button>
                </MenuItem>
                {
                    user?.userID === room.owner &&
                    <MenuItem >
                        <Button onClick={() => setOpenChangePwd(true)}>Change password</Button>
                    </MenuItem>
                }
            </Menu>
        </Box>

        <ValidationPopup
            open={openValidation}
            setOpen={setOpenValidation}
            setValidation={setValidation}
            title={`Leave room ${room.roomName} ?`}
            message={
                user?.userID === room.owner ?
                'The room will be destroyed because you are the owner.'
                :
                'You will no longer be in this room.'
            }
        />

        <ChangeRoomPwdDialog
            roomName={room.roomName}
            open={openChangePwd}
            setOpen={setOpenChangePwd}
        />
            
        </>
    );
}