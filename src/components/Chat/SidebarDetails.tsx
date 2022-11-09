import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import { Group, GroupAdd, Person, PersonAdd, Delete, Image, MeetingRoom } from '@mui/icons-material'
import { blue } from '@mui/material/colors';


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

const SidebarDetails = () => {
	return (
		<div className='w-[20%] border-r-[1px] border-y-[1px] border-slate-300 max-h-[100%] overflow-y-scroll scrollbar-hide'>
			<List>{generateOptions()}</List>
		</div>
	);
}

export default SidebarDetails;