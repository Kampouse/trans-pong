import Menu from '@mui/material/Menu';
import { ChatButtonGlobalOption } from './ChatButtonGlobalOptions';
import { ChatButtonAdminOption } from './ChatButtonAdminOptions';
import { User, userStatus } from '@prisma/client';
import { RoomDto } from 'api/chat.api';

interface ChatButtonListProps {
    displayedUser: User | null
    room: RoomDto | null
    open: null | HTMLElement
    handleClose: () => void
}

export const ChatButtonList = ({
    displayedUser,
    room,
    open,
    handleClose,

}: ChatButtonListProps ) => {

    return (
      <>
      { displayedUser ?
      <Menu
        id="contact-appbar"
        anchorEl={open}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(open)}
        onClose={handleClose}
      >
      
      <ChatButtonGlobalOption
        chosenUser={displayedUser}
        handleClose={handleClose}
      />

      <ChatButtonAdminOption 
          chosenUser={displayedUser}
          handleClose={handleClose}
          room={room}
      />
      
      </Menu>
      : 
      ''
      }
      </>
    )
}