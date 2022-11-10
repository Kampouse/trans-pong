import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import { Group, GroupAdd, Person, PersonAdd, Delete, Image, MeetingRoom, Lock } from '@mui/icons-material'
import { blue } from '@mui/material/colors';
import React from 'react';
import { ChatRoom, User } from 'components/types';

export interface SidebarDetailsProps {
	roomDetails: ChatRoom;
}

const generateOptions = () => {
	const ROOM_OPTIONS = [
		{ label: 'Change Channel Image', icon: <Image /> },
		{ label: 'Quit Channel', icon: <MeetingRoom /> },
		{ label: 'Delete Channel', icon: <Delete /> },
		{ label: 'Password Settings', icon: <Lock /> }
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

const ListUsers = ({roomDetails}: SidebarDetailsProps) => {
	return (
		<div className="w-full max-h-[100%] overflow-y-scroll scrollbar-hide">
			{ roomDetails.users.map((currentUser: User) => {
				return (
					<div className="flex flex-row flex-nowrap align-center py-1.5 pl-4 my-auto  cursor-pointer hover:bg-pink-300" onClick={ () => {} } >
						<React.Fragment key={currentUser.username}>
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
				<List>{generateOptions()}</List>
			</div>
			<div className='h-fit flex pl-4'>
				<p className='text-xl font-bold flex'>Members</p>
				<div className="align-middle pl-2">
					<IconButton sx={{ height: 25, width: 25}} onClick={() => {}}><PersonAdd /></IconButton>
				</div>
			</div>
			<div className='h-[35%] overflow-y-scroll scrollbar-hide'>
				<div className="flex py-1.5 pl-2 my-auto">
					<ListUsers roomDetails={roomDetails} />
				</div>
			</div>
		</div>
	);
}

export default SidebarDetails;