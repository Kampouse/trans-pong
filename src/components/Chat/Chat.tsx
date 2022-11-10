import { User, ChatRoom } from "../types";
import React, { useEffect, useRef, useState } from "react";
import NewRoom from "./NewRoom";
import { GeneralSnackbar } from "./Snackbar";
import SidebarRooms from "./SidebarRooms";
import SidebarDetails from "./SidebarDetails";
import Rooms from "./Rooms";
import { generateSerial } from "utils";

const Chat = () => {
	const [openNewChat, setOpenNewChat] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [rooms, setRooms] = useState([] as ChatRoom[]);
	const [roomCode, setRoomCode] = useState('');
	const snackbarMsg = useRef('');
	
	var player1: User = {username: 'gasselin', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'};
	var player2: User = {username: 'jbadia', id: 'OIWJKDJKR23', firstname: 'Justine', lastname: 'Badia'};
	var player3: User = {username: 'gcollet', id: 'FIKJM32', firstname: 'Gab', lastname: 'Collet'};
	var player4: User = {username: 'mmondell', id: 'UIDJKJ21', firstname: 'Maxime', lastname: 'Mondello'};
	var player5: User = {username: 'aguay', id: 'OIEK121', firstname: 'Anthony', lastname: 'Guay'};
	var player6: User = {username: 'olabrecq', id: 'DWAOIIK24R2', firstname: 'Olivier', lastname: 'Labrecque Lacasse'};
	var player7: User = {username: 'mleblanc', id: 'HIUWADKL32331', firstname: 'Michael', lastname: 'Leblanc'};

	const handleNewRoomClose = (room: ChatRoom | null) => {
		if (room) {
			setRooms([ ...rooms, room ]);
		}
		setOpenNewChat(false);
	}

	const getCurrentRoom = () => {
		return rooms.find((room: ChatRoom) => room.code === roomCode);
	}

	useEffect(() => {
		setRooms([{ code: generateSerial(), users: [player1, player2, player3, player4, player5, player6, player7], owner: player1, admins: [player1], status: 'public' },
							{ code: generateSerial(), users: [player1, player4], owner: player4, admins: [player4], status: 'public' }]);
	}, [])

	return (
		<div className="m-auto flex h-4/6 w-[90%] rounded-2xl">
			<SidebarRooms rooms={rooms} setRoomCode={setRoomCode} />
			{roomCode ? (
				<React.Fragment>
					<Rooms />
					<SidebarDetails roomDetails={getCurrentRoom()!} />
				</React.Fragment>
			) : (
				<div className="border border-slate-300 w-[80%] h-full flex m-auto flex-col justify-center">
					<p className='flex text-4xl font-bold justify-center align-middle'>
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