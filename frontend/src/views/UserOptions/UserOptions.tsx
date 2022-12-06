import { Person } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  Button
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { ChatRoom, User } from '@utils/types'
import React from 'react'
import { getUserDetails } from '@router/Router'
import { Link, useNavigate } from 'react-router-dom'

export interface UserOptionsProps {
  open: boolean
  currentUser: User | null
  currentRoom?: ChatRoom
	addFriendStatus: string
 	btnDisabled: boolean
  handleSendMessage: (navigate) => void
  onClose: () => void
}

const handleBlockUser = ({
  userDetails,
  currentUser
}: {
  userDetails: User
  currentUser: User | null
}) => {
  if (
    userDetails.blockedUsers.find(
      (blockedUser: User) => blockedUser.username === currentUser!.username
    ) === undefined
  )
    userDetails.blockedUsers.push(currentUser!)
  else {
    const userIndex = userDetails.blockedUsers.findIndex(
      (blockUser: User) => blockUser.username === currentUser!.username
    )
    userDetails.blockedUsers.splice(userIndex, 1)
  }
}

export function UserOptions({ 
	open,
	currentUser,
	currentRoom,
	addFriendStatus,
	btnDisabled,
	handleSendMessage,
	onClose }: UserOptionsProps) {

	const navigate = useNavigate();
	const userDetails: User = getUserDetails();
	const link = "/Profile/" + currentUser?.username;
	
	// const [addFriendButton, setAddFriendButton] = useState<string>(addFriendStatus);
	const handleAddFriendClick = ({userDetails, currentUser}: {userDetails: User, currentUser: User | null}) => {
		if (addFriendStatus === 'Add friend') {
			currentUser?.friendRequests.push(userDetails);
		}
		if (addFriendStatus === 'Delete friend') {
			const userIndex = userDetails.friendList.findIndex((user: User) => {return user.username === currentUser?.username});
			if (userIndex > -1)
				userDetails.friendList.splice(userIndex, 1);
			const friendIndex = currentUser?.friendList.findIndex((user: User) => {return user.username === userDetails.username});
			if (friendIndex && friendIndex > -1)
				currentUser?.friendList.splice(friendIndex, 1);
		}
	}

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

				{(addFriendStatus !== '') && 
					<div className="pt-2">
						<Button onClick={() => {handleClose(); handleAddFriendClick({userDetails, currentUser})}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, '&:disabled': {color: 'grey'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }} disabled={btnDisabled} >{addFriendStatus}</Button>
					</div>
				}

				<div className="pt-2">
					<Button onClick={() => {handleClose(); handleSendMessage(navigate);}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>Send Message</Button>
				</div>
				<div className="pt-2">
					<Button onClick={() => {handleClose();}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>Invite to Play</Button>
				</div>
				<div className="pt-2">
					<Button onClick={() => {handleClose(); handleBlockUser({userDetails, currentUser});}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>
						{(userDetails.blockedUsers.length === 0 || userDetails.blockedUsers.find((blockedUser: User) => blockedUser.username === currentUser!.username) === undefined) ? 'Block User' : 'Unblock User'}
					</Button>
				</div>
				{/* Kick user button if we are in chat page and a chat room is selected and the user is the owner of the room
						or the user is an admin, but can't kick out the owner or another admin of the room */}
				{ currentRoom && (currentRoom.owner.username === userDetails.username || (currentRoom.admins.find((user: User) => {user.username === userDetails.username}) !== undefined
					&& currentUser!.username !== currentRoom.owner.username) && currentRoom.admins.find((user: User) => {user.username === currentUser!.username}) === undefined)
					&&
					<div className="pt-2">
						<Button onClick={() => {handleClose();}} sx={{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white', width: 135 }}>Kick user</Button>
					</div>
				}
			</DialogContent>
		</Dialog>
	)
}
