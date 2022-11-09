import { User, ChatRoom } from "../types";
import React, { useEffect, useRef, useState } from "react";
import NewRoom from "./NewRoom";
import { GeneralSnackbar } from "./Snackbar";
import SidebarRooms from "./SidebarRooms";
import SidebarDetails from "./SidebarDetails";
import Rooms from "./Rooms";

const Chat = () => {
	const [openNewChat, setOpenNewChat] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [rooms, setRooms] = useState([] as ChatRoom[]);
	const [roomCode, setRoomCode] = useState('');
	const snackbarMsg = useRef('');
	
	var player1: User = {username: 'gasselin', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'};
	var player2: User = {username: 'jbadia', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'};
	var player3: User = {username: 'gcollet', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'};
	var player4: User = {username: 'mmondell', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'};

	const handleNewRoomClose = (room: ChatRoom | null) => {
		if (room) {
			setRooms([ ...rooms, room ]);
		}
		setOpenNewChat(false);
	}

	useEffect(() => {
		setRooms([{ code: 'OEFB23', users: [player1, player2], owner: player1, admins: [player1], status: 'public' },
							{ code: 'IOEHFIK32', users: [player1, player4], owner: player4, admins: [player4], status: 'public' }]);
		setRoomCode('OEFB23');
	}, [])

	return (
		<div className="m-auto flex h-4/6 w-[90%] rounded-2xl">
			<SidebarRooms rooms={rooms} />
			{roomCode ? (
				<React.Fragment>
					<Rooms />
					<SidebarDetails rooms={rooms} roomCode={roomCode} />
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