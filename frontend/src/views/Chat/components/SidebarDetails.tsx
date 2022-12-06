import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  Group,
  Person,
  PersonAdd,
  Delete,
  Image,
  MeetingRoom,
  Lock
} from '@mui/icons-material'
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button
} from '@material-tailwind/react'
import { blue } from '@mui/material/colors'
import React, { useRef } from 'react'
import { ChatRoom, User } from '@utils/types'
import { getUserDetails } from '@router/Router'
import '@styles/main.css'

export interface SidebarDetailsProps {
  roomDetails: ChatRoom
  setOpenNewPassword: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDeleteChannel: React.Dispatch<React.SetStateAction<boolean>>
  setOpenQuitChannel: React.Dispatch<React.SetStateAction<boolean>>
  setOpenAddUser: React.Dispatch<React.SetStateAction<boolean>>
  setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>
  userClicked: React.MutableRefObject<User | null>
}

const generateOptions = (
  { userDetails }: { userDetails: User },
  {
    roomDetails,
    setOpenNewPassword,
    setOpenDeleteChannel,
    setOpenQuitChannel
  }: SidebarDetailsProps
) => {
  const ROOM_OPTIONS = [
    {
      label: 'Change Image',
      icon: <Image />,
      ownerOnly: false,
      adminOnly: true,
			private: true,
      action: () => {}
    },
    {
      label: 'Quit Channel',
      icon: <MeetingRoom />,
      ownerOnly: false,
      adminOnly: false,
			private: false,
      action: () => setOpenQuitChannel(true)
    },
    {
      label: 'Delete Channel',
      icon: <Delete />,
      ownerOnly: true,
      adminOnly: false,
			private: false,
      action: () => setOpenDeleteChannel(true)
    },
    {
      label: 'Password Settings',
      icon: <Lock />,
      ownerOnly: true,
      adminOnly: false,
			private: false,
      action: () => setOpenNewPassword(true)
    }
  ]

  return ROOM_OPTIONS.map(
    ({ label, icon, ownerOnly, adminOnly, action }, i) => {
      return (
        ((!ownerOnly && !adminOnly) ||
          (ownerOnly && userDetails.username === roomDetails.owner.username) ||
          (adminOnly &&
            roomDetails.admins.findIndex(
              (user) => user.username === userDetails.username
            ) >= 0)) && (
          <ListItem
            key={i}
            className="hover:cursor-pointer hover:bg-sky-200"
            onClick={action}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        )
      )
    }
  )
}

const ListUsers = ({
  roomDetails,
  setOpenUserOptions,
  userClicked
}: SidebarDetailsProps) => {
  const userDetails: User = getUserDetails()

  return (
    <div className="w-full max-h-[100%] overflow-y-scroll scrollbar-hide">
      {roomDetails.users.map((currentUser: User) => {
        return (
          <div
            className="flex flex-row flex-nowrap align-center py-1.5 pl-6 my-auto  cursor-pointer hover:bg-sky-200"
            onClick={() => {
              if (userDetails.username !== currentUser.username)
                setOpenUserOptions(true)
              userClicked.current = currentUser
            }}
            key={currentUser.username}
          >
            <React.Fragment>
              <Avatar sx={{ backgroundColor: blue[700] }}>
                <Person />
              </Avatar>
              <div className="align-center my-auto pl-2">
                <p className="font-bold">{currentUser.username}</p>
              </div>
            </React.Fragment>
          </div>
        )
      })}
    </div>
  )
}

export const SidebarMembers = ({
  roomDetails,
  setOpenNewPassword,
  setOpenDeleteChannel,
  setOpenQuitChannel,
  setOpenAddUser,
  setOpenUserOptions,
  userClicked
}: SidebarDetailsProps) => {
  return (
    <div className="col-span-5 md:col-span-2 row-span-4 border-b-[1px] border-r-[1px] border-slate-300 h-full">
      <div className="h-fit flex pl-4 pt-2">
        <p className="text-xl font-bold flex">Members</p>
        {roomDetails.status === 'public' && (
          <div className="pl-2">
            <IconButton
              sx={{ height: 25, width: 25 }}
              onClick={() => setOpenAddUser(true)}
            >
              <PersonAdd />
            </IconButton>
          </div>
        )}
      </div>
      <div className="w-full max-h-[85%] grow overflow-y-scroll scrollbar-hide">
        {/* <div className="flex py-1.5 my-auto"> */}
        <ListUsers
          roomDetails={roomDetails}
          setOpenNewPassword={setOpenNewPassword}
          setOpenDeleteChannel={setOpenDeleteChannel}
          setOpenQuitChannel={setOpenQuitChannel}
          setOpenAddUser={setOpenAddUser}
          setOpenUserOptions={setOpenUserOptions}
          userClicked={userClicked}
        />
        {/* </div> */}
      </div>
    </div>
  )
}

export const SidebarOptions = ({
  roomDetails,
  setOpenNewPassword,
  setOpenDeleteChannel,
  setOpenQuitChannel,
  setOpenAddUser,
  setOpenUserOptions,
  userClicked
}: SidebarDetailsProps) => {
  const userDetails: User = getUserDetails()

  return (
    <div className="col-span-5 md:col-span-2 row-span-4 md:row-span-6 border-t-0 border-r-0 border-l-[1px] border-b-[1px] md:border-t-[1px] md:border-r-[1px] md:border-l-0 md:border-b-0 border-slate-300">
      <div className="h-[50%] overflow-y-scroll scrollbar-hide flex w-full space-x-3">
        <div className="flex flex-col justify-center m-auto w-full">
          <Avatar
            className="w-full m-auto"
            sx={{ width: [50, 75, 75, 100], height: [50, 75, 75, 100] }}
          >
            <Group />
            {/* { !roomDetails.image ? (<Group />) : (<img src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" />) } */}
          </Avatar>
          <p className="flex text-xl font-bold justify-center w-full text-center">
            {roomDetails.name}
          </p>
          <p className="flex text-md font-bold justify-center w-full text-center">
            {roomDetails.code}
          </p>
        </div>
      </div>
      <div className="h-[50%] overflow-y-scroll scrollbar-hide overflow-y-scroll scrollbar-hide">
        <List>
          {generateOptions(
            { userDetails },
            {
              roomDetails,
              setOpenNewPassword,
              setOpenDeleteChannel,
              setOpenQuitChannel,
              setOpenAddUser,
              setOpenUserOptions,
              userClicked
            }
          )}
        </List>
      </div>
    </div>
  )
}
