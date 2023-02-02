import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { PrivateProfileDto } from "utils/user.dto"
import { AvatarNoStatus } from "./AvatarNoStatus"


interface UserChatOpenButtonProps {
    displayedUser: PrivateProfileDto
    handleOpenContact: (event: React.MouseEvent<HTMLElement>, userDto: PrivateProfileDto) => void
    displayStatus: boolean
    index: number
  }

export const UserChatOpenButton = ({
    displayedUser,
    handleOpenContact,
    displayStatus,
    index

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
        
        <ListItem key={`${index}`}>
            <ListItemAvatar >
                <AvatarNoStatus 
                  user={displayedUser}
                />
            </ListItemAvatar>
            
            <ListItemText primary={
              // displayedUser && displayedUser.username
              // ? displayedUser.username.length > 8
              //   ? displayedUser.username.substring(0, 8) + '...'
              //   : displayedUser.username
              // : 'Loading...'
              (displayedUser && displayedUser.username) &&(displayedUser.username.length > 8)?
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