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
import { usersocket } from "views/Game/Matchmaking";
import { Fetch } from "utils";

if (usersocket.disconnected == true)
{
    usersocket.connect()
}
let interval = setInterval(async () => {
    let userid = await getUserId()
    if (userid != undefined && userid != "")
    {
        console.log("ok testign")
        usersocket.on("ack", async (socketId) => {
            console.log(getUserId())
            
            usersocket.emit("registerId", {userId: await getUserId(), socket: socketId}); //sending id because we cant send the socket over, so we will retrieve it on the server side
            //usersocket.emit("joinRoom", roomId)
            usersocket.off("ack")
        })
        usersocket.emit("socketIsConnected");
        clearInterval(interval)
    }
}, 100)
//usersocket.emit("socketIsConnected");

interface ChatButtonGlobalOptionProps {
    chosenUser: PrivateProfileDto, 
    handleClose: () => void
}
async function getUserId(): Promise<string>
{
    var userid;
    await Fetch ('api/profile/get/userid')
        .then((response) => response.json())
        .catch((err) => {
            return ("None");
        })
        .then((data) => {
           userid = data.userid;
        })
    return userid;
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
        navigate(`/profile/${chosenUser.username}`, { replace: true });
    };

    const handlePrivateMsg = () => {
        handleClose();
        socket.emit('sendPM', {userId: chosenUser.username});
    };
  
    const handleInvitation = async () => {
        console.log("hello")
        usersocket.emit("socketIsConnected");
        usersocket.on("ack", async (socketId) => {
            console.log("sending invite")
            usersocket.emit("registerId", {userId: await getUserId(), socket: usersocket.id}); //sending id because we cant send the socket over, so we will retrieve it on the server side
            usersocket.emit("joinPrivateGame")
            usersocket.off("ack")
        })
        usersocket.on("joinedGame", async (roomId) => {
            //socket.emit("roomToJoin", roomId)
            //send room id to other player
            console.log(chosenUser.username)
            usersocket.emit("inviteGame", {"user": chosenUser.username, "roomId": roomId});
            usersocket.off("joinedGame")
        })
        handleClose();
    };

    
    usersocket.on("roomIsReady", (room) =>
    {
        console.log("Joining private game");
        console.log(room);
        navigate(`/game/${room}`, {state:{socketid: usersocket.id}}); //pass socketid to retrieve it on the other side
        usersocket.off("roomIsReady")
    })
    usersocket.on("bullshit", () => {
        console.log("this is bullshit")
    })

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
        usersocket.on("inviteGamePrivate", async(roomId) => {
            console.log("received invite")
            usersocket.emit("joinRoom", roomId)
            usersocket.emit("socketIsConnected");
            usersocket.emit("registerId", {userId: getUserId(), socket: usersocket.id}); //sending id because we cant send the socket over, so we will retrieve it on the server side
            usersocket.off("inviteGamePrivate")
        })
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