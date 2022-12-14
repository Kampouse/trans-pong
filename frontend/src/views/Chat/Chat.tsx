import { User, ChatRoom, initAchievement } from '@utils/types'
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext
} from 'react'
import NewRoom from './components/NewRoom'
import { GeneralSnackbar } from './components/Snackbar'
import SidebarRooms from './components/SidebarRooms'
import { SidebarOptions, SidebarMembers } from './components/SidebarDetails'
import Rooms from './components/Rooms'
import { generateSerial } from 'utils'
import { PasswordSettings } from './components/PasswordSettings'
import { DeleteChannel } from './components/DeleteChannel'
import { QuitChannel } from './components/QuitChannel'
import { AddUser } from './components/AddUser'
import { AlertColor } from '@mui/material'
import '@styles/main.css'
import { UserOptions } from '@views/UserOptions/userOptions'
import { NavigateFunction } from "react-router";
import { useRooms, useUsers, useRoomCode, getUserDetails } from "../../Router/Router";
import { handleNewRoomClose, handleSendMessage } from "./ChatHandlers";
import { useAtom } from 'jotai'

// export type UserContextType = {
// 	userDetails: User;
// 	setUserDetails: (userDetails: User) => void;
// }

// export const UserContext = createContext<UserContextType>({
// 	userDetails: {username: 'gasselin', id: 'IOEHNJ323', firstname: 'Gabriel', lastname: 'Asselin'},
// 	setUserDetails: () => {}
// });

// export const useUser = () => useContext(UserContext);

const Chat = () => {
	const [openNewRoom, setOpenNewRoom] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false)
  const [openDeleteChannel, setOpenDeleteChannel] = useState(false)
  const [openQuitChannel, setOpenQuitChannel] = useState(false)
  const [openAddUser, setOpenAddUser] = useState(false)
  const [openUserOptions, setOpenUserOptions] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [users, setUsers] = useAtom(useUsers);
 	const [rooms, setRooms] = useAtom(useRooms);
 	const [roomCode, setRoomCode] = useAtom(useRoomCode);
 	const userClicked = useRef<User | null>(null)

  const snackbarMsg = useRef('')
  const snackbarBG = useRef('')
  const snackbarSeverity = useRef<AlertColor | undefined>('success')

  const handleAddUserClose = (user: string | null) => {
    const isUser = users.find((currUser: User) => currUser.username === user)
    if (user) {
      if (isUser) {
        if (
          getCurrentRoom()!.users.find(
            (currUser: User) => currUser.username === isUser.username
          ) !== undefined
        ) {
          snackbarMsg.current = 'This user is already in this group!'
          snackbarBG.current = 'orange'
          snackbarSeverity.current = 'warning'
        } else {
          snackbarMsg.current =
            user + ' has been successfully added to this channel!'
          snackbarBG.current = 'green'
          snackbarSeverity.current = 'success'
          getCurrentRoom()!.users.push(isUser)
        }
      } else {
        snackbarMsg.current = 'User ' + user + " doesn't exist in the database!"
        snackbarBG.current = 'red'
        snackbarSeverity.current = 'error'
      }
      setOpenSnackbar(true)
    }
    setOpenAddUser(false)
  }

  const handleNewPasswordClose = (newPassword: string | null) => {
    if (newPassword) {
      if (newPassword === '') getCurrentRoom()!.status = 'public'
      else getCurrentRoom()!.status = 'protected'
      getCurrentRoom()!.password = newPassword
    }
    setOpenNewPassword(false)
  }

  const handleDeleteChannelClose = (action: boolean) => {
    if (action) {
      const index = rooms.indexOf(getCurrentRoom()!)
      if (index > -1) {
        rooms.splice(index, 1)
        snackbarMsg.current = 'Channel ' + roomCode + ' has been deleted!'
        snackbarBG.current = 'green'
        snackbarSeverity.current = 'success'
        setRoomCode('')
        setOpenSnackbar(true)
      }
    }
    setOpenDeleteChannel(false)
  }

  // Set the action if the owner leaves the room
  const handleQuitChannelClose = (action: boolean) => {
    if (action) {
      const index = rooms.indexOf(getCurrentRoom()!)
      if (index > -1) {
        const users = rooms.at(index)!.users
        let userIndex = users!.indexOf(getCurrentUser(users)!)
        if (userIndex > -1) {
          rooms.at(index)!.users.splice(userIndex, 1)

          userIndex = rooms.at(index)!.admins.indexOf(getUserDetails())
          if (userIndex > -1) {
            rooms.at(index)!.admins.splice(userIndex, 1)
          }

          snackbarMsg.current = 'You left room ' + roomCode + ' successfully!'
          setRoomCode('')
          setOpenSnackbar(true)
        }
      }
    }
    setOpenQuitChannel(false)
  }

  const handleUserOptionsClose = () => {
    setOpenUserOptions(false)
  }

  const getCurrentRoom = () => {
    return rooms.find((room: ChatRoom) => room.code === roomCode)
  }

  const getCurrentUser = (users: Array<User>) => {
    return users.find(
      (user: User) => user.username === getUserDetails().username
    )
  }

	const getAddFriendStatus = (): string => {
		if (getUserDetails().friendList.find((user: User) => {return user.username === userClicked.current?.username}) !== undefined)
			return 'Delete friend';
		else if (userClicked.current?.friendRequests.find((user: User) => {return user.username === getUserDetails().username}) !== undefined)
			return 'Request sent';
		else if (userClicked.current?.blockedUsers.find((user: User) => {return user.username === getUserDetails().username}) === undefined)
			return 'Add friend';
		else
			return '';
	}

	const getAddFriendDisabled = (): boolean => {
		return (getAddFriendStatus() === 'Request sent')
	}

  return (
    <div className="m-auto flex h-4/6 w-[90%] max-w-[1500px] rounded-2xl grid grid-cols-10 grid-rows-10">
      <SidebarRooms
        rooms={rooms}
        setRoomCode={setRoomCode}
        setOpenNewRoom={setOpenNewRoom}
      />
      {roomCode && roomCode !== '' ? (
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
          <p className="flex text-4xl font-bold justify-center align-middle text-center">
            {rooms.length > 0
              ? 'Click a room to start chatting!'
              : 'Create or Join a room start chatting!'}
          </p>
        </div>
      )}
      <NewRoom
				open={openNewRoom}
				onClose={handleNewRoomClose}
				users={users}
				rooms={rooms}
				setRooms={setRooms}
				setRoomCode={setRoomCode}
				setOpenNewRoom={setOpenNewRoom}
			/>
      <PasswordSettings
        open={openNewPassword}
        onClose={handleNewPasswordClose}
      />
      <DeleteChannel
        open={openDeleteChannel}
        onClose={handleDeleteChannelClose}
      />
      <QuitChannel open={openQuitChannel} onClose={handleQuitChannelClose} />
      <AddUser open={openAddUser} onClose={handleAddUserClose} />
      <UserOptions
        open={openUserOptions}
        currentUser={userClicked.current}
        currentRoom={getCurrentRoom()!}
				addFriendStatus={getAddFriendStatus()}
				btnDisabled={getAddFriendDisabled()}
        handleSendMessage={(navigate) => handleSendMessage(userClicked, rooms, setRooms, setRoomCode, setOpenNewRoom, navigate)}
        onClose={handleUserOptionsClose}
      />
      <GeneralSnackbar
        message={snackbarMsg.current}
        open={openSnackbar}
        severity={snackbarSeverity.current}
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  )
}

export default Chat
