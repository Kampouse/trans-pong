import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { WebsocketContext } from "context/WebSocketContext"
import React from "react"

interface CreateRoomDialogProps {
    open: boolean
    onClose: any
}

export const CreateRoomDialog = ({
    open,
    onClose
} : CreateRoomDialogProps) => {

    const [roomName, setRoomName] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const [pwd, setPwd] = React.useState<string>('');
    const [errorPwd, setErrorPwd] = React.useState<string>('');

    const socket = React.useContext(WebsocketContext);

    const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    }

    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
    }

    const closeAndResetError = () => {
        setError('');
        setErrorPwd('');
        setRoomName('');
        setPwd('');
        onClose();
    }

    const onCreate = () => {
        if (roomName === '') {
            setError('Please enter a room name')
        }
        else if (roomName.length > 15) {
            setError('Name too long (15 char max)')
        }
        else if (pwd.length !== 0 && pwd.length < 5) {
            setErrorPwd('Password to short (5 char min)')
        }
        else if (pwd.length > 30) {
            setErrorPwd('Password to long (30 char max)')
        }
        else {
            socket.emit('createRoom', {roomName: roomName, password: pwd});
            setRoomName('');
            closeAndResetError();
        }
    }

    return (

        <Dialog open={open}>
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent />

            <TextField
            error={error === '' ? false : true}
            id="outlined-name"
            label="Room name"
            helperText={error}
            value={roomName}
            onChange={handleRoomChange}
            sx ={{ ml:3, mr:3 }}
            />

            <TextField
            error={errorPwd === '' ? false : true}
            id="outlined-name"
            label="password*"
            helperText={errorPwd}
            value={pwd}
            onChange={handlePwdChange}
            sx ={{ ml:3, mr:3, mt:2 }}
            />

            <Typography variant="caption" display="block" gutterBottom sx={{ ml: 3, mt: 3 }}>
                *Password is optional
            </Typography>

        <DialogContent />

        <DialogActions>
            <Button onClick={onCreate} >
                Create
            </Button>
            <Button onClick={closeAndResetError}>
                Cancel
            </Button>
        </DialogActions>

        </Dialog>
    )
}