import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { WebsocketContext } from "../contexts/WebSocketContext";
import React from "react"

export const ChatNotif = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');
    const socket = React.useContext(WebsocketContext);


    React.useEffect(() => {
      socket.on('chatNotif', ({notif}) => {
        setMessage(notif);
        setOpen(true);
      });
      return () => {
        socket.off('chatNotif');
      };
    }, [socket]);

    const handleClose = () => {
      setOpen(false);
    }

    return (
    <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Chat notification
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} autoFocus>
                ok 
            </Button>
        </DialogActions>
      </Dialog>
    )
}