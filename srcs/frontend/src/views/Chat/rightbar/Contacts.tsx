import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { FriendDto, FriendRequestDto, PrivateProfileDto } from 'utils/user.dto';
import { RoomDto } from 'api/chat.api';
import { UserContext } from 'Router/Router';
import { UserChatOpenButton } from './UserChatOpenButton';
import { ChatButtonList } from './ChatButtonList';
import { Fetch } from 'utils';
import { FriendChatOpenButton } from './FriendChatOpenButton';

const useFetch = () =>
{
	const [profileReq, setProfileReq] = React.useState<any>(null);
	
	React.useEffect(() => {
		Fetch('http://localhost:3000/profile')
      .then((response) => response.json())
			.then((data) => {
				setProfileReq(data);
			})
			.catch((err) => {
        console.error(err);
      })       
	})
	return {profileReq};
}


interface ContactsProps {
  users: PrivateProfileDto[] | null
  room: RoomDto | null
}

export const Contacts = ({
  users,
  room
}: ContactsProps ) => {
  
  const user: PrivateProfileDto | null = React.useContext(UserContext);
  //const [friends, setFriends] = React.useState<PrivateProfileDto[]>([]);
  const [otherUsers, setOtherUsers] = React.useState<PrivateProfileDto[]>([]);
  const [userButton, setUserButton] = React.useState<PrivateProfileDto | null>(null);
  //const [frienduserbutton, setFriendUserButton] = React.useState<FriendDto | null>(null);
  
  // const handleUpdateFriends = (friendList: FriendDto[]) =>
  // {
  //   setFriends(friendList);
  // };
  React.useEffect(() => {
    // if (user && user.friendList) {
    //   handleUpdateFriends(user.friendList);
    // }
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
  const handleFriendOpenButton = async (event: React.MouseEvent<HTMLElement>, userDto: FriendDto) => {
    setOpenButtons(event.currentTarget);
    const response = await Fetch(`http://localhost:3000/profile/${userDto.friendUser}`);
    const profile = await response.json();
    setUserButton(profile);
  }
    
  const handleFriendCloseButton = () => {
    setOpenButtons(null);
  };
  
  const {profileReq: friends} = useFetch();
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
        {friends && friends.error != true && (
        <li key={`friends`}>
          <ul >
          <ListSubheader style={{textAlign:'center'}}>{`Friends`}</ListSubheader>
            
            {friends.friendList.map((MdisplayedUser: FriendDto, index: number) => (

            <div key={'friend' + MdisplayedUser.friendUser + index}>
            <FriendChatOpenButton 
              displayedUser={MdisplayedUser}
              handleFriendOpenContact={handleFriendOpenButton}
              displayStatus={true}
            />

            </div>

            ))}

          </ul>
        </li>
        )}
        {otherUsers && (
         <li key={`members`}>
          <ul >
            <ListSubheader style={{textAlign:'center'}}>{`Members`}</ListSubheader>

            {otherUsers.length > 0 && otherUsers.map((displayedUser: PrivateProfileDto, index: number) => (

            (displayedUser && displayedUser.username && displayedUser.username !== user?.username) &&

            <div key={'members' + displayedUser.username + index}>

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
        )}
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
