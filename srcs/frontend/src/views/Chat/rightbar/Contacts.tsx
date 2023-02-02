import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { PrivateProfileDto } from 'utils/user.dto';
import { RoomDto } from 'api/chat.api';
import { UserContext } from 'Router/Router';
import { UserChatOpenButton } from './UserChatOpenButton';
import { ChatButtonList } from './ChatButtonList';

interface ContactsProps {
  users: PrivateProfileDto[] | null
  room: RoomDto | null
}

export const Contacts = ({
  users,
  room
}: ContactsProps ) => {

  const user: PrivateProfileDto | null = React.useContext(UserContext);
  const [friends, setFriends] = React.useState<PrivateProfileDto[]>([]);
  const [otherUsers, setOtherUsers] = React.useState<PrivateProfileDto[]>([]);
  const [userButton, setUserButton] = React.useState<PrivateProfileDto | null>(null);

  React.useEffect(() => {
    if (user && user.friendList) {
      setFriends(user.friendList);
    }
    setOtherUsers(users? users : [])
  }, [user, users]);

  const [openButtons, setOpenButtons] = React.useState<null | HTMLElement>(null);

  const handleOpenButton = (event: React.MouseEvent<HTMLElement>, userDto: PrivateProfileDto) => {
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
        {/* <li key={`friends`}>
          <ul >
          <ListSubheader style={{textAlign:'center'}}>{`Friends`}</ListSubheader>
            
            {friends.map((displayedUser, index) => (

            <div key={'friend' + displayedUser.username + String(index)}>

            <UserChatOpenButton 
              displayedUser={displayedUser}
              handleOpenContact={handleOpenButton}
              displayStatus={true}
              index = {index}
            />

            </div>

            ))}

          </ul>
        </li> */}

        <li key={`members`}>
          <ul >
            <ListSubheader style={{textAlign:'center'}}>{`Members`}</ListSubheader>

            {otherUsers.map((displayedUser, index) => (

            displayedUser.username !== user?.username &&

            <div key={'members' + displayedUser.username + String(index)}>

            <UserChatOpenButton 
              displayedUser={displayedUser}
              handleOpenContact={handleOpenButton}
              displayStatus={false}
              index = {index}
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