import { Group, GroupAdd } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { ChatRoom, User } from '../types'
import { getUserDetails } from './Chat'
import { generateSerial } from 'utils'

export interface SidebarRoomsProps {
  rooms: ChatRoom[]
  setRoomCode: React.Dispatch<React.SetStateAction<string>>
  setOpenNewChat: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarRooms = ({
  rooms,
  setRoomCode,
  setOpenNewChat
}: SidebarRoomsProps) => {
  const userDetails: User = getUserDetails()
  return (
    <div className="col-span-5 md:col-span-2 row-span-6 md:row-span-10 h-[100%] overflow-y-scroll scrollbar-hide border-l-[1px] border-y-[1px] border-slate-300">
      <div className="w-full h-full max-h-[50px] justify-end flex float-right ">
        <IconButton onClick={() => setOpenNewChat(true)}>
          <GroupAdd sx={{ color: blue[700], width: 40, height: 40 }} />
        </IconButton>
      </div>
      <div className="align-top" id={generateSerial()}>
        {rooms.map((room: ChatRoom, i: number) => {
          const userIndex = room.users.findIndex(
            (roomUser: User) => roomUser.username === userDetails.username
          )
          return (
            <>
              {userIndex >= 0 && (
                <div
                  className="flex flex-row flex-nowrap align-center py-1.5 pl-4 my-auto cursor-pointer hover:bg-sky-200"
                  onClick={(evt) => {
                    setRoomCode(room.code)
                  }}
                  key={room.code}
                >
                  <React.Fragment>
                    <Avatar sx={{ backgroundColor: blue[700] }}>
                      <Group />
                    </Avatar>
                    <div className="align-center my-auto pl-2">
                      <p className="font-bold">{room.name}</p>
                    </div>
                  </React.Fragment>
                </div>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default SidebarRooms
