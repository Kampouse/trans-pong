import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import { RoomDto } from 'api/chat.api';
import { UserContext } from 'Router/Router';
import { UserChatOpenButton } from './UserChatOpenButton';
import { ChatButtonList } from './ChatButtonList';
import { User } from '@prisma/client';

interface ContactsProps {
  users: User[] | null
  room: RoomDto | null
}

export const Contacts = ({
  users,
  room
}: ContactsProps ) => {

  const user: User | null = React.useContext(UserContext);
  const [friends, setFriends] = React.useState<User[]>([]);
  const [otherUsers, setOtherUsers] = React.useState<User[]>([]);
  const [userButton, setUserButton] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (user && user.friends) {
      setFriends(user.friends);
    }
    setOtherUsers(users? users : [])
  }, [user, users]);

  const [openButtons, setOpenButtons] = React.useState<null | HTMLElement>(null);

  const handleOpenButton = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setOpenButtons(event.currentTarget);
    setUserButton(user);
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

            <div key={'friend' + displayedUser.userID}>

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

            displayedUser.userID !== user?.userID &&

            <div key={'members' + displayedUser.userID}>

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