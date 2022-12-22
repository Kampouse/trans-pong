import { Group, GroupAdd, Lock } from '@mui/icons-material'
import { Avatar, IconButton, styled, Switch, FormControlLabel } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, {useState} from 'react'
import { ChatRoom, User } from '@utils/types'
import { getUserDetails } from '../Chat'
import { generateSerial } from 'utils'

export interface SidebarRoomsProps {
  rooms: ChatRoom[]
  setRoomCode: React.Dispatch<React.SetStateAction<string>>
  setOpenNewRoom: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarSwitch = ({switchSide, setSwitchSide}: {switchSide : boolean, setSwitchSide : React.Dispatch<React.SetStateAction<boolean>>}) => {

	return (
		<div className={`flex w-[60px] h-[30px] rounded-full ${switchSide ? 'bg-[#f48fb1]' : 'bg-blue-700'}`} onClick={() => setSwitchSide(!switchSide)}>
			<div className={`w-[50%] h-full m-auto my-auto pt-0.5 ${!switchSide ? 'pl-1.5' : 'pl-2'}`}>
				<div className={`h-[20px] w-[20px] ${!switchSide ? 'rounded-full bg-white mt-[3px]' : ''}`}>
					{switchSide &&
						<Lock sx={{height: 20, width: 20, color: '#1d4fd8'}} />
					}
				</div>
			</div>
			<div className={`w-[50%] h-full m-auto my-auto pt-0.5 ${switchSide ? 'pl-[5px]' : ' pl-1'}`}>
				<div className={`h-[20px] w-[20px] ${switchSide ? 'rounded-full bg-white mt-[3px]' : ''}`}>
					{!switchSide && 
						<Group sx={{height: 20, width: 20, color: '#f48fb1'}} />
					}
				</div>
			</div>
		</div>
	)
}

const SidebarRooms = ({
  rooms,
  setRoomCode,
  setOpenNewRoom
}: SidebarRoomsProps) => {

  const userDetails: User = getUserDetails()
	const [switchSide, setSwitchSide] = useState(false); // false = public rooms; true = private rooms

 	const getOtherUser = (room : ChatRoom) => {
 		const otherUser = room.users.find((user: User) => user.username !== userDetails.username);
 		if (otherUser !== undefined)
 			return otherUser.username;
 		return '';
 	}

  return (
    <div className="col-span-5 md:col-span-2 row-span-6 md:row-span-10 h-[100%] overflow-y-scroll scrollbar-hide border-l-[1px] border-y-[1px] border-slate-300">
      <div className="w-full h-full max-h-[50px] justify-end flex float-right">
 				<div className="h-fit m-auto">
 					<SidebarSwitch switchSide={switchSide} setSwitchSide={setSwitchSide} />
 				</div>
 				<IconButton onClick={() => setOpenNewRoom(true)}><GroupAdd sx={{ color: '#1d4fd8', width: 40, height: 40 }}/></IconButton>
 			</div>
      <div className="align-top" id={generateSerial()}>
			{!switchSide && rooms.map((room: ChatRoom) => {
					const userIndex = room.users.findIndex((roomUser: User) => roomUser.username === userDetails.username);
					return (			
						<>	
							{userIndex >= 0 && room.status !== 'private' && (
									<div className="flex flex-row flex-nowrap align-center py-1.5 pl-4 my-auto cursor-pointer hover:bg-sky-200" onClick={(evt) => {setRoomCode(room.code)} }  key={room.code}>
										<React.Fragment>
											<Avatar sx={{ backgroundColor: blue[700] }}><Group /></Avatar>
											<div className="align-center my-auto pl-2">
												<p className="font-bold">{room.name}</p>
											</div>
										</React.Fragment>
									</div>
							)}
						</>
					)
				})}

				{switchSide && rooms.map((room: ChatRoom) => {
					const userIndex = room.users.findIndex((roomUser: User) => roomUser.username === userDetails.username);
					return (
						<>
							{userIndex >= 0 && room.status === 'private' && (
								<div className="flex flex-row flex-nowrap align-center py-1.5 pl-4 my-auto cursor-pointer hover:bg-sky-200" onClick={(evt) => {setRoomCode(room.code)} }  key={room.code}>
									<React.Fragment>
										<Avatar sx={{ backgroundColor: blue[700] }}><Lock /></Avatar>
										<div className="align-center my-auto pl-2">
											<p className="font-bold">{getOtherUser(room)}</p>
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
