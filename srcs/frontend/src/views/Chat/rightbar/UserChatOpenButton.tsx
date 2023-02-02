import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { PrivateProfileDto, FriendDto } from "utils/user.dto"
import { AvatarNoStatus } from "./AvatarNoStatus"


interface UserChatOpenButtonProps {
    displayedUser: FriendDto
    handleOpenContact: (event: React.MouseEvent<HTMLElement>, userDto: FriendDto) => void
    displayStatus: boolean

  }

export const UserChatOpenButton = ({
    displayedUser,
    handleOpenContact,
    displayStatus,

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
        
        <ListItem key={`${displayedUser.friendUser}`}>
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
              (displayedUser && displayedUser.friendUser) &&(displayedUser.friendUser.length > 8)?
              displayedUser.friendUser.substring(8) + '...'
              :
              displayedUser.friendUser
              } 
              sx={{ ml:2 }}
            />
        </ListItem>

        </Button>
    )
}