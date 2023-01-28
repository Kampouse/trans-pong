import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { AvatarNoStatus } from "./AvatarNoStatus"
import { User, userStatus } from '@prisma/client';

interface UserChatOpenButtonProps {
    displayedUser: User
    handleOpenContact: (event: React.MouseEvent<HTMLElement>, user: User) => void
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