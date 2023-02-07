import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { FriendDto, PrivateProfileDto } from "utils/user.dto"
import { AvatarNoStatusFriend } from "./AvatarNoStatus"


interface FriendChatOpenButtonProps {
    displayedUser: FriendDto
    handleFriendOpenContact: (event: React.MouseEvent<HTMLElement>, userDto: FriendDto) => void
    displayStatus: boolean
  }

export const FriendChatOpenButton = ({
    displayedUser,
    handleFriendOpenContact,
    displayStatus,

} : FriendChatOpenButtonProps ) => {
    
    return (
        <Button
        id="basic-button"
        aria-label="account of current user"
        aria-controls="contact-appbar"
        aria-haspopup="true"
        sx={{ textTransform: 'none' }}
        onClick={(e : any) => {handleFriendOpenContact(e, displayedUser)}}
      >
        
        <ListItem key={displayedUser.friendUser}>
            <ListItemAvatar >
            <AvatarNoStatusFriend 
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