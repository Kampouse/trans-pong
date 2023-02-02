import React, { useState, useRef, useEffect } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { PrivateProfileDto, FriendDto } from 'utils/user.dto';
import { RoomDto } from 'api/chat.api';
import { UserContext } from 'Router/Router';
import { UserChatOpenButton } from './UserChatOpenButton';
import { ChatButtonList } from './ChatButtonList';
import {Fetch } from 'utils';

const useFetch = () =>
{
	const [profileReq, setProfileReq] = useState<any>(null);
	
	useEffect(() => {
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
//   const [friends, setFriends] = React.useState<PrivateProfileDto[]>([]);
  const [otherUsers, setOtherUsers] = React.useState<PrivateProfileDto[]>([]);
  const [userButton, setUserButton] = React.useState<PrivateProfileDto | null>(null);

  React.useEffect(() => {
    // if (user && user.friendList) {
    //   setFriends(user.friendList);
    // }
    setOtherUsers(users? users : [])
  }, [user, users]);

  const [openButtons, setOpenButtons] = React.useState<null | HTMLElement>(null);

  const handleOpenButton = (event: React.MouseEvent<HTMLElement>, userDto: FriendDto) => {
    setOpenButtons(event.currentTarget);
    setUserButton(userDto);
  }
    
  const handleCloseButton = () => {
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
	            
	            {friends.friendList.map((displayedUser) => (

	            <div key={'friend' + displayedUser.friendUser}>

	            <UserChatOpenButton 
	              displayedUser={displayedUser}
	              handleOpenContact={handleOpenButton}
	              displayStatus={true}
	            />

	            </div>

	            ))}

	          </ul>
	        </li>
				)}
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
