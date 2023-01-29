import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { PrivateProfileDto } from "utils/user.dto"
import { AvatarNoStatus } from "./AvatarNoStatus"

interface UserChatOpenButtonProps {
    displayedUser: PrivateProfileDto
    handleOpenContact: (event: React.MouseEvent<HTMLElement>, userDto: PrivateProfileDto) => void
    displayStatus: boolean
  }

export const UserChatOpenButton = ({
    displayedUser,
    handleOpenContact,
    displayStatus

} : UserChatOpenButtonProps ) => {
    
    return (
        <Button
        id="basic-button"
        aria-label="account of current user"
        aria-controls="contact-appbar"
        aria-haspopup="true"
        sx={{ textTransform: 'none' }}
        onClick={(e : any) => {handleOpenContact(e, displayedUser)}}
      >
        
        <ListItem key={displayedUser.id}>
            <ListItemText primary={
              (displayedUser.username).length > 8?
              (displayedUser.username).substring(8) + '...'
              :
              displayedUser.username
              } 
              sx={{ ml:2 }}
            />
        </ListItem>

        </Button>
    )
}