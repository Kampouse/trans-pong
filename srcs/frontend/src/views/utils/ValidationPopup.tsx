import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, DialogContentText } from '@mui/material';

interface ValidationPopupProps {
    open: boolean
    setOpen: Function
    setValidation: Function
    title: string 
    message: string
}

export default function ValidationPopup({open, setOpen, setValidation, title, message}: ValidationPopupProps) {

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmation = (click: boolean) => {
    setOpen(false);
    setValidation(click);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleConfirmation(true)} autoFocus>
                ok 
            </Button>
            <Button onClick={() => handleConfirmation(false)} autoFocus>
                cancel 
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}