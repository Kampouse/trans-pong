import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Group, Person, PersonAdd, Delete, Image, MeetingRoom, Lock } from '@mui/icons-material'
import { blue } from '@mui/material/colors';
import React from 'react';
import { ChatRoom, User } from 'components/types';
import { useUser } from './Chat';

export interface SidebarDetailsProps {
	roomDetails: ChatRoom;
}

const generateOptions = ({ userDetails}: { userDetails: User}, {roomDetails}: SidebarDetailsProps) => {
	const ROOM_OPTIONS = [
		{ label: 'Change Channel Image', icon: <Image />, ownerOnly: false, adminOnly: true },
		{ label: 'Quit Channel', icon: <MeetingRoom />, ownerOnly: false, adminOnly: false },
		{ label: 'Delete Channel', icon: <Delete />, ownerOnly: true, adminOnly: false },
		{ label: 'Password Settings', icon: <Lock />, ownerOnly: true, adminOnly: false }
	];
	
	return ROOM_OPTIONS.map(({label, icon, ownerOnly, adminOnly}, i) => {
		return (
			((!ownerOnly && !adminOnly) || (ownerOnly && userDetails.username === roomDetails.owner.username)
			|| (adminOnly && roomDetails.admins.findIndex((user) => (user.username === userDetails.username)) >= 0))
			&& (
				<ListItem key={i} className="hover:cursor-pointer hover:bg-sky-200">
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={label} />
				</ListItem>
			)
	)});
}

const ListUsers = ({roomDetails}: SidebarDetailsProps) => {
	return (
		<div className="w-full max-h-[100%] overflow-y-scroll scrollbar-hide">
			{ roomDetails.users.map((currentUser: User) => {
				return (
					<div className="flex flex-row flex-nowrap align-center py-1.5 pl-6 my-auto  cursor-pointer hover:bg-sky-200" onClick={ () => {} }  key={currentUser.username}>
						<React.Fragment>
							<Avatar sx={{ backgroundColor: blue[700] }}><Person /></Avatar>
							<div className="align-center my-auto pl-2">
								<p className="font-bold">{currentUser.username}</p>
							</div>
						</React.Fragment>
					</div>
					)
				})
			}
		</div>
	);
}

const SidebarDetails = ({roomDetails}: SidebarDetailsProps) => {
	const { userDetails } = useUser();
	return (
		<div className='lg:w-[20%] border-r-[1px] border-y-[1px] border-slate-300 max-h-[100%] overflow-y-scroll scrollbar-hide'>
			<div className="h-[30%] mt-2 flex w-full max-w-xs space-x-3">
	      <div className="flex flex-col justify-center m-auto">
					<Avatar className='w-full m-auto' sx={{ width: [75, 100, 125], height: [75, 100, 125] }}>
						{ !roomDetails.image ? (<Group />) : (<img src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" />) }
					</Avatar>
					<p className='flex text-xl font-bold justify-center'>{ roomDetails.code }</p>
	      </div>
			</div>
			<div className='h-[30%] overflow-y-scroll scrollbar-hide'>
				<List>{generateOptions({userDetails}, {roomDetails})}</List>
			</div>
			<div className='h-fit flex pl-4'>
				<p className='text-xl font-bold flex'>Members</p>
				{roomDetails.status === 'public' &&
					<div className="pl-2">
						<IconButton sx={{ height: 25, width: 25}} onClick={() => {}}><PersonAdd /></IconButton>
					</div>
				}
			</div>
			<div className='h-[35%] overflow-y-scroll scrollbar-hide'>
				<div className="flex py-1.5 my-auto">
					<ListUsers roomDetails={roomDetails} />
				</div>
			</div>
		</div>
	);
}

export default SidebarDetails;