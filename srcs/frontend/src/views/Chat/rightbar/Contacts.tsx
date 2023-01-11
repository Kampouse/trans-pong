import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { UserDto } from 'api/dto/user.dto';
import { RoomDto } from 'api/chat.api';
import { UserContext } from '../../../Router/Router';
import { UserChatOpenButton } from './UserChatOpenButtons';
import { ChatButtonList } from './ChatButtonList';

interface ContactsProps {
  users: UserDto[] | null
  room: RoomDto | null
}

export const Contacts = ({
  users,
  room
}: ContactsProps ) => {

  const user: UserDto | null = React.useContext(UserContext);
  const [friends, setFriends] = React.useState<UserDto[]>([]);
  const [otherUsers, setOtherUsers] = React.useState<UserDto[]>([]);
  const [userButton, setUserButton] = React.useState<UserDto | null>(null);

  React.useEffect(() => {
    if (user && user.friends) {
      setFriends(user.friends);
    }
    setOtherUsers(users? users : [])
  }, [user, users]);

  const [openButtons, setOpenButtons] = React.useState<null | HTMLElement>(null);

  const handleOpenButton = (event: React.MouseEvent<HTMLElement>, userDto: UserDto) => {
    setOpenButtons(event.currentTarget);
    setUserButton(userDto);
  }
    
  const handleCloseButton = () => {
    setOpenButtons(null);
  };
  

  return (
    <>
    <List key='contact-list'
      sx={{
        bgcolor: 'background.paper',
        overflow: 'auto',
        height: '90vh',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
      >
        <li key={`friends`}>
          <ul >
          <ListSubheader style={{textAlign:'center'}}>{`Friends`}</ListSubheader>

            {friends.map((displayedUser) => (

            <div key={'friend' + displayedUser.id}>

            <UserChatOpenButton 
              displayedUser={displayedUser}
              handleOpenContact={handleOpenButton}
              displayStatus={true}
            />

            </div>

            ))}

          </ul>
        </li>

        <li key={`members`}>
          <ul >
            <ListSubheader style={{textAlign:'center'}}>{`Members`}</ListSubheader>

            {otherUsers.map((displayedUser) => (

            displayedUser.id !== user?.id &&

            <div key={'members' + displayedUser.id}>

            <UserChatOpenButton 
              displayedUser={displayedUser}
              handleOpenContact={handleOpenButton}
              displayStatus={false}
            />


            </div>

            ))}

          </ul>
        </li>
    </List>

    <ChatButtonList 
      open={openButtons}
      handleClose={handleCloseButton}
      displayedUser={userButton}
      room={room}
    />

    </>
  );
}