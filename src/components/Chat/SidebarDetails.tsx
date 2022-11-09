import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import { Group, GroupAdd, Person, PersonAdd, Delete, Image, MeetingRoom } from '@mui/icons-material'
import { blue } from '@mui/material/colors';
import React from 'react';
import { ChatRoom, User } from 'components/types';

export interface SidebarDetailsProps {
	rooms: ChatRoom[];
	roomCode: string;
}

const generateOptions = () => {
	const ROOM_OPTIONS = [
		{ label: 'Channel Icon', icon: <Group /> },
		{ label: 'Add Channel', icon: <GroupAdd /> },
		{ label: 'Quit Channel', icon: <MeetingRoom /> },
		{ label: 'Change Channel Icon', icon: <Image /> },
		{ label: 'User Icon', icon: <Person /> },
		{ label: 'Add User', icon: <PersonAdd /> },
		{ label: 'Delete Channel', icon: <Delete /> }
	];
	
	return ROOM_OPTIONS.map(({label, icon}, i) => {
		return (
			<ListItem key={i}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={label} />
			</ListItem>
		);
	});
}

const ListUsers = ({rooms, roomCode}: SidebarDetailsProps) => {
	console.log(rooms.length);
	rooms.forEach((currRoom: ChatRoom) => console.log(currRoom.code));
	const currentRoom = rooms.find((roomUser: ChatRoom) => {roomUser.code === roomCode});
	console.log(currentRoom);

	return (
		<div>
			{ currentRoom !== undefined &&
				currentRoom.users.map((currentUser: User) => {
					return (
					<React.Fragment>
						<Avatar sx={{ backgroundColor: blue[700] }}><Person /></Avatar>
						<div className="align-center my-auto pl-2">
							<p className="font-bold">{currentUser.username}</p>
						</div>
					</React.Fragment>
					)
				})
			}
		</div>
	);
}

const SidebarDetails = ({rooms, roomCode}: SidebarDetailsProps) => {
	return (
		<div className='w-[20%] border-r-[1px] border-y-[1px] border-slate-300 max-h-[100%] overflow-y-scroll scrollbar-hide'>
			<div className='h-[60%] overflow-y-scroll scrollbar-hide'>
				<List>{generateOptions()}</List>
			</div>
			<div className='h-[40%] overflow-y-scroll scrollbar-hide'>
				<div className="flex flex-row flex-nowrap align-center py-1.5 pl-4 my-auto" onClick={ () => {} }>
					<ListUsers rooms={rooms} roomCode={roomCode} />
				</div>
			</div>
		</div>
	);
}

export default SidebarDetails;