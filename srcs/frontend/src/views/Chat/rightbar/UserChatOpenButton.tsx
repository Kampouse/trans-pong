import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { UserDto } from "utils/user.dto"
import { AvatarNoStatus } from "./AvatarNoStatus"


interface UserChatOpenButtonProps {
    displayedUser: UserDto
    handleOpenContact: (event: React.MouseEvent<HTMLElement>, userDto: UserDto) => void
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
        
        <ListItem key={displayedUser.userID}>
            <ListItemAvatar >
                <AvatarNoStatus 
                  user={displayedUser}
                />
            </ListItemAvatar>
            <ListItemText primary={
              displayedUser.username.length > 8?
              displayedUser.username.substring(8) + '...'
              :
              displayedUser.username
              } 
              sx={{ ml:2 }}
            />
        </ListItem>

        </Button>
    )
}