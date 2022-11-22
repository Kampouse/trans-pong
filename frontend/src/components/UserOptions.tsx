import { Person } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Avatar, Button } from "@mui/material";
import { blue } from '@mui/material/colors';
import { ChatRoom, User } from "components/types";
import React from "react";
import { getUserDetails } from './Chat/Chat';
import { Link } from "react-router-dom";

export interface UserOptionsProps {
	open: boolean;
	currentUser: User | null;
	handleSendMessage: () => void;
	onClose: () => void;
}

const handleBlockUser = ({userDetails, currentUser}: {userDetails: User, currentUser: User | null}) => {
	if (userDetails.blockedUsers.find((blockedUser: User) => blockedUser.username === currentUser!.username) === undefined)
		userDetails.blockedUsers.push(currentUser!);
	else {
		const userIndex = userDetails.blockedUsers.findIndex((blockUser: User) => blockUser.username === currentUser!.username);
		userDetails.blockedUsers.splice(userIndex, 1);
	}
}

export function UserOptions({ open, currentUser, handleSendMessage, onClose }: UserOptionsProps) {
	const  userDetails: User = getUserDetails();
	const link = "/Profile/" + currentUser?.username;

	const handleClose = () => {
		onClose();
	}

	return (
		<Dialog onClose={() => handleClose()} open={open}>
			<DialogTitle className="bg-sky-200 text-blue-700">
				<React.Fragment>
					<div className="flex">
						<Avatar sx={{ backgroundColor: blue[700] }}><Person /></Avatar>
						<div className="align-center my-auto pl-2">
							{ currentUser && <p className="font-bold">{currentUser!.username}</p>}
						</div>
					</div>
				</React.Fragment>
			</DialogTitle>
			<DialogContent className="bg-sky-200 text-blue-700">
				<div>
					<Button component={Link} to={link} onClick={() => {handleClose();}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>See Profile</Button>
				</div>
				<div className="pt-2">
					<Button onClick={() => {handleClose(); handleSendMessage();}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>Send Message</Button>
				</div>
				<div className="pt-2">
					<Button onClick={() => {handleClose();}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>Invite to Play</Button>
				</div>
				<div className="pt-2">
					<Button onClick={() => {handleClose(); handleBlockUser({userDetails, currentUser});}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>
						{(userDetails.blockedUsers.length === 0 || userDetails.blockedUsers.find((blockedUser: User) => blockedUser.username === currentUser!.username) === undefined) ? 'Block User' : 'Unblock User'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
