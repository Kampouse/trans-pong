import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { WebsocketContext } from "../../contexts/WebSocketContext";
import React from "react"

interface JoinRoomDialogProps {
    roomName: string
    open: boolean
    setOpen: Function
}

export const JoinRoomDialog = ({
    open,
    roomName,
    setOpen
}: JoinRoomDialogProps ) => {

    const [pwd, setPwd] = React.useState<string>('');
    const socket = React.useContext(WebsocketContext);

    const joinRoom = () => {
        setOpen(false);
        socket.emit('joinRoom', {roomName: roomName, password: pwd});
    }

    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
    }

    return (
        <Dialog 
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">Create Room</DialogTitle>
        <DialogContent />
        <DialogContentText id="alert-dialog-description" sx={{ml:3, mr:3, mb:3}}>
            Would you like to join {roomName} ? (Password is optional)
        </DialogContentText>

        <TextField
          id="outlined-password-input"
          label="Password"
          onChange={handlePwdChange}
          sx={{ml:3, mr:3}}
        />

        <DialogContent />

        <DialogActions>
            <Button onClick={joinRoom} >
                Join
            </Button>
            <Button onClick={() => { setOpen(false)} }>
                Cancel
            </Button>
        </DialogActions>

        </Dialog>
    );
}