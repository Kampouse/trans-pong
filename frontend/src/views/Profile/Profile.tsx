import { Achievement, Matches, User } from '@utils/types'
import { Tabs, Tab, Box, Typography, IconButton, Dialog, Button, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useState, useRef } from 'react'
import {
  History,
  Favorite,
  PersonAdd,
  EmojiEvents,
  Equalizer,
  Lock,
  WorkspacePremium,
  CheckCircle,
  Cancel,
	Edit
} from '@mui/icons-material'
import { UserOptions } from '@views/UserOptions'
import { blue } from '@mui/material/colors'
import { getUserDetails, useRoomCode, useRooms } from "@router/Router";
import { handleSendMessage } from '@Chat/ChatHandlers'
import { useAtom } from 'jotai';
import { NavigateFunction } from 'react-router';

function MatchResult({ userDetails }: { userDetails: User }) {
  return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg"
          >
            <li className="flex h-[40px] w-full">
              <div className="w-[37%] my-auto text-center">
                <p>Winner</p>
              </div>
              <div className="w-[26%] my-auto text-center">
                <p>Result</p>
              </div>
              <div className="w-[37%] my-auto text-center">
                <p>Loser</p>
              </div>
            </li>
            {userDetails.matchHistory.map((currentMatch: Matches) => {
              return (
                <li className="flex py-4">
                  <div className="flex w-[37%] my-auto items-center ml-2">
                    <div className=" h-[32px] w-[32px] shrink-0 sm:table-cell">
                      <img
                        className="h-full w-full rounded-full"
                        src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-2">
                      <p className=" text-gray-900">
                        {currentMatch.result === 'win'
                          ? userDetails.username
                          : currentMatch.opponent.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-full w-[26%] my-auto">
                    <div className="w-[50%] my-auto">
                      <p className=" text-center text-gray-900">
                        {currentMatch.result === 'win'
                          ? currentMatch.scoreUser
                          : currentMatch.scoreOpp}
                      </p>
                    </div>
                    <div className="w-[50%] my-auto">
                      <p className=" text-center text-gray-900">
                        {currentMatch.result === 'loss'
                          ? currentMatch.scoreUser
                          : currentMatch.scoreOpp}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-[37%] my-auto justify-end items-center mr-2">
                    <div className="mr-2">
                      <p className=" text-gray-900">
                        {currentMatch.result === 'loss'
                          ? userDetails.username
                          : currentMatch.opponent.username}
                      </p>
                    </div>
                    <div className=" h-[32px] w-[32px] shrink-0 sm:table-cell">
                      <img
                        className="h-full w-full rounded-full"
                        src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                        alt=""
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function FriendList({ userDetails }: { userDetails: User }) {
  const ONLINE = 'text-green-600 text-md'
  const PLAYING = 'text-amber-500 text-md'
  const OFFLINE = 'text-red-600 text-md'

  const getStatusCSS = (currentUser: User) => {
    if (currentUser.status === 'Online') return ONLINE
    else if (currentUser.status === 'Playing') return PLAYING
    else return OFFLINE
  }

  return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300"
          >
            {userDetails.friendList.map((currentUser: User) => {
              return (
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        className="h-12 w-12 border-2 border-blue-700 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600">
                        {currentUser.username}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-slate-500">
                        <span className={getStatusCSS(currentUser)}>●</span>
                        {currentUser.status}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function FriendRequests({ userDetails }: { userDetails: User }): JSX.Element {
  const [friendRequests, setFriendRequests] = useState<Array<User>>(
    userDetails.friendRequests
  )

  const deleteRequest = ({ currentUser }: { currentUser: User }) => {
    setFriendRequests(
      friendRequests.filter((request) => {
        return request.username != currentUser.username
      })
    )

    const userIndex = userDetails.friendRequests.findIndex(
      (user: User) => currentUser.username === user.username
    )
    if (userIndex > -1) {
      userDetails.friendRequests.splice(userIndex, 1)
    }
  }

  const handleAcceptRequest = ({ currentUser }: { currentUser: User }) => {
    userDetails.friendList.push(currentUser)
    deleteRequest({ currentUser })
  }

  return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300"
          >
            {friendRequests.map((currentUser: User) => {
              return (
                <li id="request" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        className="h-12 w-12 border-2 border-blue-700 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-lg font-semibold text-gray-900 dark:text-slate-600">
                        {currentUser.username}
                      </p>
                    </div>
                    <div className="flex w-fit justify-end">
                      <IconButton
                        onClick={() => {
                          handleAcceptRequest({ currentUser })
                        }}
                      >
                        <CheckCircle sx={{ color: blue[700] }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deleteRequest({ currentUser })
                        }}
                      >
                        <Cancel sx={{ color: blue[700] }} />
                      </IconButton>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Achievements({ userDetails }: { userDetails: User }) {
  return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg"
          >
            {userDetails.achievements.map((currentAchievement: Achievement) => {
              return (
                <li className="py-4">
                  <div className="flex items-center m-auto">
                    {currentAchievement.achieved ? (
                      <React.Fragment>
                        <div className="w-12 h-12">
                          <div className="h-[32px] w-[32px]">
                            <WorkspacePremium
                              sx={{ width: 32, height: 32, m: 1 }}
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 pl-2">
                          <p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600">
                            {currentAchievement.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-500">
                            {currentAchievement.description}
                          </p>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="w-12 h-12">
                          <div className="h-[32px] w-[32px]">
                            <Lock sx={{ height: 32, width: 32, m: 1 }} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 pl-2">
                          <p className="truncate text-lg font-semibold text-gray-900 dark:text-slate-600">
                            Locked
                          </p>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export interface DeleteChannelProps {
	open: boolean;
	onClose: () => void;
}

export function EditProfile({ open, onClose }: DeleteChannelProps) {
	const [newDisplayName, setNewDisplayName] = useState('');

	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle className="bg-sky-200 text-blue-700">
				Edit Profile
			</DialogTitle>
			<DialogContent className="bg-sky-200">
				<p className='pb-1'>Display Name</p>
				<div className='pl-8 h-fit w-full'>
					<input className='w-full' onChange={(e) => {setNewDisplayName(e.target.value)}} type="text" placeholder="Enter New Display Name" />
				</div>
				<p className='pt-4 pb-1'>Profile Image</p>
				<div className='flex pl-8 h-fit w-fit'>
					<Button variant="contained" component="label" className='pl-4'>
						Upload
						<input hidden accept="image/*" type="file" id='image-input' />
					</Button>
					<p className='pl-2 h-fit my-auto'>No file uploaded</p>
				</div>
			</DialogContent>
			<DialogActions className="bg-sky-200 flex">
				<Button onClick={onClose} sx={{ fontWeight: 'bold' }}>Save changes</Button>
				<Button onClick={onClose} sx={{ fontWeight: 'bold' }}>Cancel changes</Button>
			</DialogActions>
		</Dialog>
	);
}

export default function Profile({userClicked}: {userClicked: React.MutableRefObject<User | null>}) {
  const userDetails: User = getUserDetails()
  const [value, setValue] = useState('1')
  const [openUserOptions, setOpenUserOptions] = useState(false)
	const [hover, setHover] = useState(false);
 	const [openEditProfile, setOpenEditProfile] = useState(false);
 	const [rooms, setRooms] = useAtom(useRooms);
 	const setRoomCode = useAtom(useRoomCode)[1];
 	const [openNewRoom, setOpenNewRoom] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

	const getAddFriendStatus = (): string => {
		if (userDetails.friendList.find((user: User) => {return user.username === userClicked.current?.username}) !== undefined)
			return 'Delete friend';
		else if (userClicked.current?.friendRequests.find((user: User) => {return user.username === userDetails.username}) !== undefined ||
						userDetails.friendRequests.find((user: User) => {return user.username === userClicked.current?.username}))
			return 'Request sent';
		else if (userClicked.current?.blockedUsers.find((user: User) => {return user.username === userDetails.username}) === undefined)
			return 'Add friend';
		else
			return '';
	}

	const getAddFriendDisabled = (): boolean => {
		return (getAddFriendStatus() === 'Request sent')
	}

  const handleUserOptionsClose = () => {
  	setOpenUserOptions(false);
  }

  return (
    <div className="m-auto pt-[50px] items-center lg:flex-row  h-[90%] max-h-[750px] w-[90%] max-w-[400px] w-fit">
      <div className="w-full h-[100%] flex flex-col bg-sky-200 rounded-lg m-auto">
        <div className="w-full h-[25%] flex">
				<div className='w-[50%] h-full flex items-center justify-center'>
						{ hover && 
							<div className='absolute mx-auto z-50 h-[35px] w-[35px] hover:cursor-pointer' onMouseEnter={() => setHover(true)} onClick={() => {setOpenEditProfile(true); setHover(false)}}>
								<Edit sx={{color: blue[700], height: 35, width: 35}} />
							</div>
						}
						<img 
							className={`rounded-full h-full border-4 border-blue-700 h-[75%] mx-auto relative ${hover ? 'brightness-[.25] cursor-pointer' : ''}`}
							src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
							alt="Edit"
							onMouseEnter={() => setHover(true)}
							onMouseLeave={() => setHover(false)}
							onClick={() => {setOpenEditProfile(true); setHover(false)}}
						/>
					</div>
          <div className="w-[50%] h-full flex  mx-auto">
            <div className="h-fit my-auto">
              <p className="text-2xl font-bold ">{userDetails.username}</p>
              <p className="text-lg font-semibold">
                <span className="text-green-600">●</span> Online
              </p>
            </div>
          </div>
        </div>
        <TabContext value={value}>
          <div className="w-[100%] h-fit p-1 mx-auto ">
            <Box>
              <TabList
                value={value}
                onChange={handleChange}
                variant="scrollable"
                allowScrollButtonsMobile
                scrollButtons
              >
                <Tab
                  icon={<History />}
                  label="HISTORY"
                  sx={{ fontWeight: 'bold' }}
                  value="1"
                />
                <Tab
                  icon={<Favorite />}
                  label="FRIENDS"
                  sx={{ fontWeight: 'bold' }}
                  value="2"
                />
                <Tab
                  icon={<PersonAdd />}
                  label="REQUESTS"
                  sx={{ fontWeight: 'bold' }}
                  value="3"
                />
                <Tab
                  icon={<EmojiEvents />}
                  label="TROPHIES"
                  sx={{ fontWeight: 'bold' }}
                  value="4"
                />
                <Tab
                  icon={<Equalizer />}
                  label="STATS"
                  sx={{ fontWeight: 'bold' }}
                  value="5"
                />
              </TabList>
            </Box>
          </div>

          <div className="grow overflow-hidden">
            <div className="max-h-[100%] overflow-y-scroll overflow-hidden">
              <TabPanel value="1">
                <MatchResult userDetails={userDetails} />
              </TabPanel>
              <TabPanel value="2">
                <FriendList userDetails={userDetails} />
              </TabPanel>
              <TabPanel value="3">
                <FriendRequests userDetails={userDetails} />
              </TabPanel>
              <TabPanel value="4">
                <Achievements userDetails={userDetails} />
              </TabPanel>
              <TabPanel value="5">STATS</TabPanel>
            </div>
          </div>
        </TabContext>
      </div>
			<EditProfile onClose={() => setOpenEditProfile(false)} open={openEditProfile} />
			<UserOptions open={openUserOptions} currentUser={userClicked.current} addFriendStatus={getAddFriendStatus()} btnDisabled={getAddFriendDisabled()} handleSendMessage={(navigate) => {handleSendMessage(userClicked, rooms, setRooms, setRoomCode, setOpenNewRoom, navigate)}} onClose={handleUserOptionsClose} />
    </div>
  )
}
