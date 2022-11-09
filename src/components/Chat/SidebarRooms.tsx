import { Group } from "@mui/icons-material";
import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import { blue } from "@mui/material/colors";
import { fontSize } from "@mui/system";
import React, { createContext, useContext } from "react";
import { ChatRoom, User } from '../types'

export type UserContextType = {
	userDetails: User;
	setUserDetails: (userDetails: User) => void;
}

export const UserContext = createContext<UserContextType>({
	userDetails: {username: 'gasselin', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'},
	setUserDetails: () => {}
});

export const useUser = () => useContext(UserContext);

export interface SidebarRoomsProps {
	rooms: ChatRoom[];
}

// export function switchChannel() {
	
// }

const SidebarRooms = ({rooms}: SidebarRoomsProps) => {
	const { userDetails } = useUser();
	return (
		<div className="w-[20%] max-h-[100%] overflow-y-scroll scrollbar-hide border-l-[1px] border-y-[1px] border-slate-300">
			{rooms.map((room: ChatRoom, i: number) => {
				const userIndex = room.users.findIndex((roomUser: User) => roomUser.username === userDetails.username);
				return (				
					<div className="flex flex-row flex-nowrap align-center py-1.5 pl-4 my-auto" onClick={ () => {} }>
						{userIndex >= 0 && (
							<React.Fragment>
								<Avatar sx={{ backgroundColor: blue[700] }}><Group /></Avatar>
								<div className="align-center my-auto pl-2">
									<p className="font-bold">{room.code}</p>
								</div>
							</React.Fragment>
						)}
					</div>
				)
				})}
		</div>
	)
}

export default SidebarRooms;