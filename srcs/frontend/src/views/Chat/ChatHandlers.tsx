import { getUserDetails } from "@router/Router";
import { ChatRoom, User } from "@utils/types";
import { generateSerial } from "utils";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router";

export const handleNewRoomClose = (room: ChatRoom | null, rooms: ChatRoom[], setRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>, setOpenNewRoom:  React.Dispatch<React.SetStateAction<boolean>>) => {
	setOpenNewRoom(false);
	if (room) {
		setRooms([ ...rooms, room ]);
	}
}

export const handleSendMessage = (
	userClicked: React.MutableRefObject<User | null>,
	rooms: ChatRoom[],
	setRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>,
	setRoomCode: React.Dispatch<React.SetStateAction<string>>,
	setOpenNewRoom: React.Dispatch<React.SetStateAction<boolean>>,
	navigate: NavigateFunction
) => {
	const privateRoom = rooms.find((currentRoom: ChatRoom) => {
		return (currentRoom.status === 'private' && currentRoom.users.length === 2
		&& currentRoom.users.find((user1: User) => user1.username === getUserDetails().username) !== undefined
		&& currentRoom.users.find((user2: User) => user2.username === userClicked.current!.username) !== undefined)
	})
	
	if (privateRoom === undefined) {
		const serial = generateSerial();
		handleNewRoomClose({code: serial, name: 'Private Room', users: [getUserDetails(), userClicked.current!], owner: getUserDetails(),
												admins: [getUserDetails(), userClicked.current!], status: 'private', password: '', messages: [], image: null},
												rooms, setRooms, setOpenNewRoom);
		setRoomCode(serial);
	}
	else {
		setRoomCode(privateRoom.code);
	}
	navigate('/Chat')
}
