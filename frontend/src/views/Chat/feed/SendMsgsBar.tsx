import { Box, IconButton, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

interface SendMsgsBarProps {
    setSend: Function;
    setMessage: Function;
    message: string;
}

export const SendMsgBar = ({
    setSend,
    setMessage, 
    message
}: SendMsgsBarProps) => {

    const handleMsgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: "column",
            alignItems: 'center',
        }}>
            <TextField style={{width:"90%"}}
                id="outlined-multiline-static"
                label="Type your message"
                placeholder="Your message"
                multiline
                rows={3}
                value={message}
                onChange={handleMsgChange}
                InputProps={{
                    endAdornment: (
                        <IconButton edge="end" color="primary" onClick={() => {setSend(true)}} >
                            <SendIcon/>
                        </IconButton>
                    ),}}
            />
        </Box>
  
    )
}