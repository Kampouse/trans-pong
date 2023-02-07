import { FormControl, FormControlLabel, FormGroup, MenuItem } from "@mui/material"
import Switch from '@mui/material/Switch';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { UserContext, SetUserContext } from 'Router/Router';
import * as React from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UserAPI } from "api/user.api";
import { PrivateProfileDto } from "utils/user.dto";
import { WebsocketContext } from "context/WebSocketContext";

interface ChatButtonGlobalOptionProps {
    chosenUser: PrivateProfileDto, 
    handleClose: () => void
}

export const ChatButtonGlobalOption = ({
    chosenUser,
    handleClose

}: ChatButtonGlobalOptionProps) => {

    const user: PrivateProfileDto | null = React.useContext(UserContext);
    const setUser: Function = React.useContext(SetUserContext);
    const socket = React.useContext(WebsocketContext);
    const navigate: NavigateFunction = useNavigate();

    const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

    const handleBlock = async (event: React.MouseEvent<HTMLElement>) => {
        let resp: PrivateProfileDto | null;
        if (!isBlocked) {
            resp = await UserAPI.addBlock(chosenUser.username); // 
        }
        else {
            resp = await UserAPI.removeBlock(chosenUser.username); // 
        }
        setUser(resp);
    };
  
    const handleProfile = () => {
        navigate(`/profile/${chosenUser.username}`);
    };

    const handlePrivateMsg = () => {
        handleClose();
        socket.emit('sendPM', {userId: chosenUser.username});
    };
  
    const handleInvitation = () => {
        handleClose();
        socket.emit("inviteGame", chosenUser.username);
    };

    React.useEffect(() => {
        const initIsBlocked = async () => {
            let blocked = false;

            if (user && user.blockList) {
                if (user.blockList.find(({friendUser}) => friendUser === chosenUser.username )) {
                    blocked = true;
                }
            }
            setIsBlocked(blocked);
        }
    
        initIsBlocked();

    }, [user, chosenUser]);

    return (
                    
        <FormGroup>
        <FormControl>

          {/* ************** PROFILE *************** */}

          <MenuItem onClick={handleProfile}><PersonIcon/><p style={{ marginLeft: "15px" }} >Profile</p></MenuItem>

           {/* ************** PRIVATE MESSAGES *************** */}

          <MenuItem onClick={handlePrivateMsg}><PersonIcon/><p style={{ marginLeft: "15px" }} >Send pm</p></MenuItem>

          {/* ************** INVITATION *************** */}

          <MenuItem onClick={handleInvitation}><SportsEsportsIcon/><p style={{ marginLeft: "15px" }} >Play a game</p></MenuItem>
          

          {/* ************** BLOCK *************** */}

          <MenuItem><BlockIcon/>
            <FormControlLabel
                value="Block"
                control={
                <Switch
                    checked={isBlocked}
                    color="primary"
                    aria-label="block user"
                    aria-controls="contact-appbar"
                    aria-haspopup="true"
                    onClick={handleBlock} 
                />}
                label="Block"
                labelPlacement="start"
            />
          </MenuItem>
          </FormControl>
        </FormGroup>
    )
}