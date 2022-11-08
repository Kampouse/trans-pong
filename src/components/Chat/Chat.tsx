import { User, ChatRoom } from "../types";
import React, { useEffect, useRef, useState } from "react";
import NewRoom from "./NewRoom";
import { GeneralSnackbar } from "./Snackbar";
import SidebarRooms from "./SidebarRooms";
import SidebarDetails from "./Sidebar";
import Rooms from "./Rooms";

const Chat = () => {
	const [openNewChat, setOpenNewChat] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [rooms, setRooms] = useState([] as ChatRoom[]);
	const [roomCode, setRoomCode] = useState('');
	const snackbarMsg = useRef('');
	
	var users: User[] = [{username: 'gasselin', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'}];

	const handleNewRoomClose = (room: ChatRoom | null) => {
		if (room) {
			setRooms([ ...rooms, room ]);
		}
		setOpenNewChat(false);
	}

	useEffect(() => {
		handleNewRoomClose({ code: 'OEFB23', users: users, owner: users[0], admins: users });
		setRoomCode('ABCDE');
	}, [])

	return (
		<div className="mt-40 ml-40">
			<SidebarRooms />
			{roomCode ? (
				<React.Fragment>
					<Rooms />
					<SidebarDetails />
				</React.Fragment>
			) : (
				<div>
					<p>
						{rooms.length > 0 ? 'Click a room to start chatting!' : 'Create or Join a room start chatting!'}
					</p>
				</div>
			)}
			<NewRoom open={openNewChat} onClose={handleNewRoomClose} />
			<GeneralSnackbar message={snackbarMsg.current} open={openSnackbar} onClose={() => setOpenSnackbar(false)} />
		</div>
	);
}

export default Chat;