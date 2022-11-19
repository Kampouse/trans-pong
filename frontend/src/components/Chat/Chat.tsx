import { User, ChatRoom } from "../types";
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import NewRoom from "./NewRoom";
import { GeneralSnackbar } from "./Snackbar";
import SidebarRooms from "./SidebarRooms";
import {SidebarOptions, SidebarMembers} from "./SidebarDetails";
import Rooms from "./Rooms";
import { generateSerial } from "utils";
import { PasswordSettings } from "./PasswordSettings";
import { DeleteChannel } from "./DeleteChannel";
import { QuitChannel } from "./QuitChannel";
import { AddUser } from "./AddUser";
import { AlertColor } from "@mui/material";
import '../main.css';
import { UserOptions } from "./UserOptions";

// export type UserContextType = {
// 	userDetails: User;
// 	setUserDetails: (userDetails: User) => void;
// }

// export const UserContext = createContext<UserContextType>({
// 	userDetails: {username: 'gasselin', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'},
// 	setUserDetails: () => {}
// });

// export const useUser = () => useContext(UserContext);

var player2: User = {username: 'jbadia', id: 'OIWJKDJKR23', blockedUsers: [], status: 'Online', matchHistory: [], friendList: [], firstname: 'Justine', lastname: 'Badia'};
var player3: User = {username: 'gcollet', id: 'FIKJM32', blockedUsers: [], status: 'Online', matchHistory: [], friendList: [], firstname: 'Gab', lastname: 'Collet'};
var player4: User = {username: 'mmondell', id: 'UIDJKJ21', blockedUsers: [], status: 'Playing', matchHistory: [], friendList: [], firstname: 'Maxime', lastname: 'Mondello'};
var player5: User = {username: 'aguay', id: 'OIEK121', blockedUsers: [], status: 'Playing', matchHistory: [], friendList: [], firstname: 'Anthony', lastname: 'Guay'};
var player6: User = {username: 'olabrecq', id: 'DWAOIIK24R2', blockedUsers: [], status: 'Offline', matchHistory: [], friendList: [], firstname: 'Olivier', lastname: 'Labrecque Lacasse'};
var player7: User = {username: 'mleblanc', id: 'HIUWADKL32331', blockedUsers: [], status: 'Offline', matchHistory: [], friendList: [], firstname: 'Michael', lastname: 'Leblanc'};
var player8: User = {username: 'tberube', id: 'OAISJIK23', blockedUsers: [], status: 'Offline', matchHistory: [], friendList: [], firstname: 'Thomas', lastname: 'Bérubé'};

var player1: User = {username: 'gasselin', id: 'IOEHNJ323', blockedUsers: [], status: 'Online', matchHistory: [{scoreUser: 5, scoreOpp: 0, opponent: player2, result: 'win'}, {scoreUser: 2, scoreOpp: 5, opponent: player5, result: 'loss'}, {scoreUser: 5, scoreOpp: 4, opponent: player7, result: 'win'}, {scoreUser: 5, scoreOpp: 0, opponent: player2, result: 'win'}, {scoreUser: 5, scoreOpp: 0, opponent: player2, result: 'win'}], friendList: [player2, player3, player4, player5, player6, player7, player8], firstname: 'Gabriel', lastname: 'Asselin'};

var userDetails: User = player1;
export const getUserDetails = () => { return userDetails; }

const Chat = () => {
	const [openNewChat, setOpenNewChat] = useState(false);
	const [openNewPassword, setOpenNewPassword] = useState(false);
	const [openDeleteChannel, setOpenDeleteChannel] = useState(false);
	const [openQuitChannel, setOpenQuitChannel] = useState(false);
	const [openAddUser, setOpenAddUser] = useState(false);
	const [openUserOptions, setOpenUserOptions] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [rooms, setRooms] = useState([] as ChatRoom[]);
	const [users, setUsers] = useState([] as User[]);
	const [roomCode, setRoomCode] = useState('');
	const userClicked = useRef<User | null>(null);

	const snackbarMsg = useRef('');
	const snackbarBG = useRef('');
	const snackbarSeverity = useRef<AlertColor | undefined>('success');
	
	const handleNewRoomClose = (room: ChatRoom | null) => {
		if (room) {
			setRooms([ ...rooms, room ]);
		}
		setOpenNewChat(false);
	}

	const handleAddUserClose = (user: string | null) => {
		const isUser = users.find((currUser: User) => currUser.username === user);
		if (user) {
			if (isUser) {
				if (getCurrentRoom()!.users.find((currUser: User) => currUser.username === isUser.username) !== undefined) {
					snackbarMsg.current = 'This user is already in this group!';
					snackbarBG.current = 'orange';
					snackbarSeverity.current = 'warning';
				}
				else {
					snackbarMsg.current = user + ' has been successfully added to this channel!';
					snackbarBG.current = 'green';
					snackbarSeverity.current = 'success';
					getCurrentRoom()!.users.push(isUser);
				}
			}
			else {
				snackbarMsg.current = 'User ' + user + ' doesn\'t exist in the database!';
				snackbarBG.current = 'red';
				snackbarSeverity.current = 'error';
			}
			setOpenSnackbar(true);
		}
		setOpenAddUser(false);
	}

	const handleNewPasswordClose = (newPassword: string | null) => {
		if (newPassword) {
			if (newPassword === '')
				getCurrentRoom()!.status = 'public';
			else
			getCurrentRoom()!.status = 'protected';
			getCurrentRoom()!.password = newPassword;
		}
		setOpenNewPassword(false);
	}

	const handleDeleteChannelClose = (action: boolean) => {
		if (action) {
			const index = rooms.indexOf(getCurrentRoom()!);
			if (index > -1) {
				rooms.splice(index, 1);
				snackbarMsg.current = 'Channel ' + roomCode + ' has been deleted!';
				snackbarBG.current = 'green';
				snackbarSeverity.current = 'success';
				setRoomCode('');
				setOpenSnackbar(true);
			}
		}
		setOpenDeleteChannel(false);
	}

	// Set the action if the owner leaves the room
	const handleQuitChannelClose = (action: boolean) => {
		if (action) {
			const index = rooms.indexOf(getCurrentRoom()!);
			if (index > -1) {
				const users = rooms.at(index)!.users;
				var userIndex = users!.indexOf(getCurrentUser(users)!);
				if (userIndex > -1) {
					rooms.at(index)!.users.splice(userIndex, 1);

					userIndex = rooms.at(index)!.admins.indexOf(getUserDetails());
					if (userIndex > -1) {
						rooms.at(index)!.admins.splice(userIndex, 1);
					}

					snackbarMsg.current = 'You left room ' + roomCode + ' successfully!';
					setRoomCode('');
					setOpenSnackbar(true);
				}
			}
		}
		setOpenQuitChannel(false);
	}

	const handleUserOptionsClose = () => {
		setOpenUserOptions(false);
	}

	function checkPrivateRoom(currentRoom: ChatRoom) {
		return (currentRoom.status === 'private' && currentRoom.users.length === 2
		&& currentRoom.users.find((user1: User) => user1.username === getUserDetails().username) !== undefined
		&& currentRoom.users.find((user2: User) => user2.username === userClicked.current!.username) !== undefined)
	}

	const handleSendMessage = () => {
		console.log(rooms);
		const privateRoom = rooms.find(checkPrivateRoom)
		console.log(privateRoom);
		
		if (privateRoom === undefined) {
			const serial = generateSerial();
			handleNewRoomClose({code: serial, name: 'Private Room', users: [getUserDetails(), userClicked.current!], owner: getUserDetails(),
													admins: [getUserDetails(), userClicked.current!], status: 'private', password: '', messages: [], image: null});
			setRoomCode(serial);
		}
		else {
			setRoomCode(privateRoom.code);
		}
	}

	const getCurrentRoom = () => {
		return rooms.find((room: ChatRoom) => room.code === roomCode);
	}

	const getCurrentUser = (users: Array<User>) => {
		return users.find((user: User) => user.username === getUserDetails().username);
	}

	useEffect(() => {
		setRooms([{ code: generateSerial(), name: 'Room1', users: [player1, player2, player3, player4, player5, player6, player7], owner: player1, admins: [player1, player2], status: 'public', password: '', messages: [], image: null },
							{ code: generateSerial(), name: 'Room2', users: [player1, player4], owner: player4, admins: [player4], status: 'private', password: '', messages: [], image: null }]);
		setUsers([player1, player2, player3, player4, player5, player6, player7, player8]);
	}, [])

	return (
		<div className="m-auto flex h-4/6 w-[90%] max-w-[1500px] rounded-2xl grid grid-cols-10 grid-rows-10">
			<SidebarRooms rooms={rooms} setRoomCode={setRoomCode} setOpenNewChat={setOpenNewChat} />
			{(roomCode && roomCode !== '') ? (
				<React.Fragment>
					<Rooms roomDetails={getCurrentRoom()!} />
					<SidebarOptions
						roomDetails={getCurrentRoom()!}
						setOpenNewPassword={setOpenNewPassword}
						setOpenDeleteChannel={setOpenDeleteChannel}
						setOpenQuitChannel={setOpenQuitChannel}
						setOpenAddUser={setOpenAddUser}
						setOpenUserOptions={setOpenUserOptions}
						userClicked={userClicked}
					/>
					<SidebarMembers
						roomDetails={getCurrentRoom()!}
						setOpenNewPassword={setOpenNewPassword}
						setOpenDeleteChannel={setOpenDeleteChannel}
						setOpenQuitChannel={setOpenQuitChannel}
						setOpenAddUser={setOpenAddUser}
						setOpenUserOptions={setOpenUserOptions}
						userClicked={userClicked}
					/>
				</React.Fragment>
			) : (
				<div className="col-span-5 md:col-span-8 row-span-6 md:row-span-10 w-full border border-slate-300 h-full flex m-auto flex-col justify-center">
					<p className='flex text-4xl font-bold justify-center align-middle text-center'>
						{rooms.length > 0 ? 'Click a room to start chatting!' : 'Create or Join a room start chatting!'}
					</p>
				</div>
			)}
			<NewRoom open={openNewChat} onClose={handleNewRoomClose} />
			<PasswordSettings open={openNewPassword} onClose={handleNewPasswordClose} />
			<DeleteChannel open={openDeleteChannel} onClose={handleDeleteChannelClose} />
			<QuitChannel open={openQuitChannel} onClose={handleQuitChannelClose} />
			<AddUser open={openAddUser} onClose={handleAddUserClose} />
			<UserOptions open={openUserOptions} currentUser={userClicked.current} handleSendMessage={handleSendMessage} onClose={handleUserOptionsClose} />
			<GeneralSnackbar message={snackbarMsg.current} open={openSnackbar} severity={snackbarSeverity.current} onClose={() => setOpenSnackbar(false)} />
		</div>
	);
}

export default Chat;