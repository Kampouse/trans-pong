import { Person } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  Button
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { ChatRoom, User } from 'components/types'
import React from 'react'
import { getUserDetails } from '@views/Chat/Chat'
import { Link } from 'react-router-dom'

export interface UserOptionsProps {
  open: boolean
  currentUser: User | null
  currentRoom?: ChatRoom
  handleSendMessage: () => void
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

const handleFriendRequest = ({
  userDetails,
  currentUser
}: {
  userDetails: User
  currentUser: User | null
}) => {
  currentUser!.friendRequests.push(userDetails)
}

export function UserOptions({
  open,
  currentUser,
  currentRoom,
  handleSendMessage,
  onClose
}: UserOptionsProps) {
  const userDetails: User = getUserDetails()
  const link = '/Profile/' + currentUser?.username

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <DialogTitle className="bg-sky-200 text-blue-700">
        <React.Fragment>
          <div className="flex">
            <Avatar sx={{ backgroundColor: blue[700] }}>
              <Person />
            </Avatar>
            <div className="align-center my-auto pl-2">
              {currentUser && (
                <p className="font-bold">{currentUser!.username}</p>
              )}
            </div>
          </div>
        </React.Fragment>
      </DialogTitle>
      <DialogContent className="bg-sky-200 text-blue-700">
        <div>
          <Button
            component={Link}
            to={link}
            onClick={() => {
              handleClose()
            }}
            sx={{
              '&:hover': { backgroundColor: '#1d4ed8' },
              backgroundColor: '#1d4ed8',
              color: 'white',
              width: 135
            }}
          >
            See Profile
          </Button>
        </div>

        {(userDetails.friendList.find((user: User) => {
          user.username === userDetails.username
        }) !== undefined && (
          <div className="pt-2">
            <Button
              onClick={() => {}}
              sx={{
                '&:hover': { backgroundColor: '#1d4ed8' },
                backgroundColor: '#1d4ed8',
                color: 'white',
                width: 135
              }}
            >
              Delete friend
            </Button>
          </div>
        )) ||
          (currentUser?.friendRequests.find((user: User) => {
            user.username === userDetails.username
          }) !== undefined && (
            <div className="pt-2">
              <Button
                onClick={() => {}}
                sx={{
                  '&:hover': { backgroundColor: '#1d4ed8' },
                  backgroundColor: '#1d4ed8',
                  color: 'white',
                  width: 135
                }}
              >
                Request Sent
              </Button>
            </div>
          )) ||
          (currentUser?.blockedUsers.find((user: User) => {
            user.username === userDetails.username
          }) === undefined && (
            <div className="pt-2">
              <Button
                onClick={() => {}}
                sx={{
                  '&:hover': { backgroundColor: '#1d4ed8' },
                  backgroundColor: '#1d4ed8',
                  color: 'white',
                  width: 135
                }}
              >
                Add friend
              </Button>
            </div>
          ))}

        <div className="pt-2">
          <Button
            onClick={() => {
              handleClose()
              handleSendMessage()
            }}
            sx={{
              '&:hover': { backgroundColor: '#1d4ed8' },
              backgroundColor: '#1d4ed8',
              color: 'white',
              width: 135
            }}
          >
            Send Message
          </Button>
        </div>
        <div className="pt-2">
          <Button
            onClick={() => {
              handleClose()
            }}
            sx={{
              '&:hover': { backgroundColor: '#1d4ed8' },
              backgroundColor: '#1d4ed8',
              color: 'white',
              width: 135
            }}
          >
            Invite to Play
          </Button>
        </div>
        <div className="pt-2">
          <Button
            onClick={() => {
              handleClose()
              handleBlockUser({ userDetails, currentUser })
            }}
            sx={{
              '&:hover': { backgroundColor: '#1d4ed8' },
              backgroundColor: '#1d4ed8',
              color: 'white',
              width: 135
            }}
          >
            {userDetails.blockedUsers.length === 0 ||
            userDetails.blockedUsers.find(
              (blockedUser: User) =>
                blockedUser.username === currentUser!.username
            ) === undefined
              ? 'Block User'
              : 'Unblock User'}
          </Button>
        </div>
        {/* Kick user button if we are in chat page and a chat room is selected and the user is the owner of the room
						or the user is an admin, but can't kick out the owner or another admin of the room */}
        {currentRoom &&
          (currentRoom.owner.username === userDetails.username ||
            (currentRoom.admins.find((user: User) => {
              user.username === userDetails.username
            }) !== undefined &&
              currentUser!.username !== currentRoom.owner.username &&
              currentRoom.admins.find((user: User) => {
                user.username === currentUser!.username
              }) === undefined)) && (
            <div className="pt-2">
              <Button
                onClick={() => {
                  handleClose()
                }}
                sx={{
                  '&:hover': { backgroundColor: '#1d4ed8' },
                  backgroundColor: '#1d4ed8',
                  color: 'white',
                  width: 135
                }}
              >
                Kick user
              </Button>
            </div>
          )}
      </DialogContent>
    </Dialog>
  )
}
