import { Matches, User } from '../../utils/types';
import { Tab, Box, IconButton, Dialog, Button, DialogContent, DialogTitle, Switch } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useState, useRef, useEffect } from 'react';
import { History, Favorite, PersonAdd, EmojiEvents, Equalizer, Lock, WorkspacePremium, CheckCircle, Cancel, Edit } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { useRoomCode, useRooms } from "Router/Router";
import { useAtom } from 'jotai';
import { useParams } from 'react-router';
import { GeneralSnackbar } from 'views/Snackbar/Snackbar';
import { AlertColor } from '@mui/material';

const ONLINE = "text-green-600 text-md";
const PLAYING = "text-amber-500 text-md";
const OFFLINE = "text-red-600 text-md";

const getStatusCSS = (status) => {
	if (status === 'online')
		return ONLINE;
	else if (status === 'playing')
		return PLAYING;
	else
		return OFFLINE;
}

const useFetch = (username) => {
	const [profileReq, setProfileReq] = useState<any>(null);
	// const [loggedinReq, setLoggedinReq] = useState<any>(null);
	
	useEffect(() => {
		fetch('http://localhost:3000/profile' + ((username) ? "/" + username : "") , {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true'
			}
		})
            .then((response) => response.json())
			.then((data) => {
				setProfileReq(data);
			})
	}, [username])
	return {profileReq};
}

function MatchResult({data, username, userClicked, setOpenUserOptions}: {data: any, username: string | undefined, userClicked: React.MutableRefObject<User | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>}) {
  function onUserClick(currentMatch: Matches) {setOpenUserOptions(true); userClicked.current = currentMatch.opponent;}
	
	return (
		<div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg"
          >
						<li className="flex h-[40px] w-full">
							<div className="w-[37%] my-auto text-center"><p>Winner</p></div>
							<div className="w-[26%] my-auto text-center"><p>Result</p></div>
							<div className="w-[37%] my-auto text-center"><p>Loser</p></div>
						</li>
						{ data.matchHistory.map((currentMatch) => {
							const winner = (currentMatch.leftScore > currentMatch.rightScore) ? "left" : "right";
							return (
								<li className="flex py-4">
									<div className="flex w-[37%] my-auto items-center ml-2">
										<div className="h-[32px] w-[32px] shrink-0 sm:table-cell">
											{/* ${currentMatch. === 'loss' ? 'cursor-pointer hover:border-2 border-pink-500' : ''} */}
											<img
												className={`h-full w-full rounded-full`}
												src={(winner === "left") ? currentMatch.leftPhoto : currentMatch.rightPhoto}
												alt=""
												// onClick={() => (currentMatch.result === 'loss') ? onUserClick(currentMatch) : undefined}
											/>
										</div>
										<div className="ml-2">
											<p
												//  ${loggedUser.username === ((winner === "left") ? currentMatch.leftPlayer : currentMatch.rightPlayer) ? 'font-bold' : 'cursor-pointer hover:underline underline-offset-2'}
												className={`text-gray-900`}
												// onClick={() => (currentMatch.result === 'loss') ? onUserClick(currentMatch) : undefined}
											>
												{(winner == "left") ? currentMatch.leftPlayer : currentMatch.rightPlayer}
											</p>
										</div>
									</div>
									<div className="flex h-full w-[26%] my-auto">
										<div className="w-[50%] my-auto">
											<p className=" text-center text-gray-900">{(winner === 'left') ? currentMatch.leftScore : currentMatch.rightScore}</p>
										</div>
										<div className="w-[50%] my-auto">
											<p className=" text-center text-gray-900">{(winner === 'left') ? currentMatch.rightScore : currentMatch.leftScore}</p>
										</div>
									</div>
									<div className="flex w-[37%] my-auto justify-end items-center mr-2">
										<div className="mr-2">
											<p
												// ${loggedUser.username === ((winner === "left") ? currentMatch.rightPlayer : currentMatch.leftPlayer) ? 'font-bold' : 'cursor-pointer hover:underline underline-offset-2'}
												className={`text-gray-900`}
												onClick={() => (currentMatch.result === 'win') ? onUserClick(currentMatch) : undefined}
											>
												{(winner == "left") ? currentMatch.rightPlayer : currentMatch.leftPlayer}
											</p>
										</div>
										<div className=" h-[32px] w-[32px] shrink-0 sm:table-cell">
											<img
												className={`h-full w-full rounded-full`}
												src={(winner === "left") ? currentMatch.rightPhoto : currentMatch.leftPhoto}
												alt=""
												// onClick={() => (currentMatch.result === 'win') ? onUserClick(currentMatch) : undefined}
											/>
										</div>
									</div>
								</li>
							);
						})}
          </ul>
        </div>
      </div>
    </div>
	);
}

function FriendList({data, userClicked, setOpenUserOptions}: {data: any, userClicked: React.MutableRefObject<string | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>}) {

  return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300"
          >
						{ data.friendList.map((currentUser) => {
							return (
								<li className="py-4">
									<div className="flex items-center space-x-4">
										<div className="shrink-0">
											<img
												className="h-12 w-12 border-2 border-blue-700 rounded-full hover:border-pink-500 hover:cursor-pointer"
												src={currentUser.friendPhoto}
												alt=""
												onClick={() => {setOpenUserOptions(true); userClicked.current = currentUser;}}
											/>
										</div>
										<div className="min-w-0 flex-1">
											<p
												className="truncate text-md font-semibold text-gray-900 dark:text-slate-600 hover:cursor-pointer hover:underline underline-offset-2"
												onClick={() => {setOpenUserOptions(true); userClicked.current = currentUser;}}
											>
												{currentUser.friendUser}
											</p>
											<p className="text-sm text-gray-500 dark:text-slate-500"><span className={getStatusCSS(currentUser.friendStatus)}>●</span> {currentUser.friendStatus[0].toUpperCase() + currentUser.friendStatus.substring(1)}</p>
										</div>
									</div>
								</li>
							);
						})}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FriendRequests({data, userClicked, setOpenUserOptions}: {data: any, userClicked: React.MutableRefObject<string | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {
	const [friendRequests, setFriendRequests ] = useState(data.friendRequests);

	const deleteRequest = (currentUser) => {
		setFriendRequests(
      friendRequests.filter((request) => {
        return request.fromUser != currentUser.fromUser;
      })
    );

		const userIndex = data.friendRequests.findIndex((user) => currentUser.fromUser === user.fromUser);
		if (userIndex > -1) {
			// data.friendRequests.splice(userIndex, 1);
			// Replace with push to delete request in queue
		}
	}

	const handleAcceptRequest = (currentUser) => {
		// data.friendList.push(currentUser);
		// Replace with push to add friend to friendList
		deleteRequest({currentUser});
	}

	return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300"
          >
						{ friendRequests.map((currentUser) => {
							return (
								<li id='request' className="py-4">
									<div className="flex items-center space-x-4">
										<div className="shrink-0">
											<img
												className="h-12 w-12 border-2 border-blue-700 rounded-full hover:border-pink-500 hover:cursor-pointer"
												src={currentUser.fromPhoto}
												alt=""
												// onClick={() => {setOpenUserOptions(true); userClicked.current = currentUser;}}
											/>
										</div>
										<div className="min-w-0 flex-1">
											<p 
												className="truncate text-lg font-semibold text-gray-900 dark:text-slate-600 hover:cursor-pointer hover:underline underline-offset-2"
												// onClick={() => {setOpenUserOptions(true); userClicked.current = currentUser;}}
											>
												{currentUser.fromUser}
											</p>
										</div>
										<div className='flex w-fit justify-end'>
											<IconButton onClick={() => {handleAcceptRequest({currentUser});}}>
												<CheckCircle sx={{ color: blue[700] }} />
											</IconButton>
											<IconButton onClick={() => {deleteRequest({currentUser});}}>
												<Cancel sx={{ color: blue[700] }} />
											</IconButton>
										</div>
									</div>
								</li>
							);
						})}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Achievements({data}: {data: any}) {
	return (
		<div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg"
          >
						{ data.achievement.map((currentAchievement) => {
							return (
								<li className="py-4">
									<div className="flex items-center m-auto">
										{ (currentAchievement.achieved) ? (
											<React.Fragment>
												<div className="w-12 h-12">
													<div className="h-[32px] w-[32px]">
														<WorkspacePremium sx={{ width: 32, height: 32, m: 1}} />
													</div>
												</div>
												<div className="min-w-0 flex-1 pl-2">
													<p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600">{currentAchievement.name}</p>
													<p className="text-sm text-gray-500 dark:text-slate-500">{currentAchievement.description}</p>
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
													<p className="truncate text-lg font-semibold text-gray-900 dark:text-slate-600">Locked</p>
												</div>
											</React.Fragment>
										)}
									</div>
								</li>
							);
						})}
          </ul>
        </div>
      </div>
    </div>
	);
}

export interface EditProfileProps {
	open: boolean;
	onClose: () => void;
	setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
	snackbarMsg: React.MutableRefObject<string>;
	snackbarSeverity: React.MutableRefObject<AlertColor | undefined>;
}

export function EditProfile({ open, onClose, setOpenSnackbar, snackbarMsg, snackbarSeverity }: EditProfileProps) {
	const [newDisplayName, setNewDisplayName] = useState('');
	const [isChecked, setIsChecked] = useState(false);

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
				<div className='h-[32px] w-full'>
					<button
						className='float-right text-sm bg-[#1976d2] text-white rounded-md py-0.5 px-1 my-1'
						onClick={() => {
							setOpenSnackbar(true);
							snackbarMsg.current = 'Error occured';
							snackbarSeverity.current = 'error';
						}}
					>
						APPLY
					</button>
				</div>
				<p className='py-1'>Profile Image</p>
				<div className='flex pl-8 h-fit w-fit'>
					<Button
						variant="contained"
						component="label"
						className='pl-4'
					>
						Upload
						<input hidden accept="image/*" type="file" id='image-input' />
					</Button>
					<p className='pl-2 h-fit my-auto'>No file uploaded</p>
				</div>
				<div className='h-[32px] w-full'>
					<button
						className='float-right text-sm bg-[#1976d2] text-white rounded-md py-0.5 px-1 my-1'
						onClick={() => {
							setOpenSnackbar(true);
							snackbarMsg.current = 'Error occured';
							snackbarSeverity.current = 'error';
						}}
					>
						APPLY
					</button>
				</div>
				<p className='py-1'>2-Way Authentification</p>
				<div className='flex pl-8 h-fit w-fit'>
					<Switch checked={isChecked} onChange={(evt) => {setIsChecked(evt.target.checked)}} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default function Profile() {
	const [value, setValue] = useState("1");
	const [openUserOptions, setOpenUserOptions] = useState(false);
	const [hover, setHover] = useState(false);
	const [openEditProfile, setOpenEditProfile] = useState(false);
	const [rooms, setRooms] = useAtom(useRooms);
	const setRoomCode = useAtom(useRoomCode)[1];
	const [openNewRoom, setOpenNewRoom] = useState(false);
	const userClicked = useRef(null);

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const snackbarMsg = useRef('')
  const snackbarSeverity = useRef<AlertColor | undefined>('success')

	const { username } = useParams();
	const {profileReq: data} = useFetch(username);
	// const {profileReq: loggedUser} = useFetch(undefined);
	// console.log(data);
	// console.log(loggedUser);
	// console.log(username);

	// const navigate = useNavigate()
	// useEffect(() => {
		// If username === logged in user
		//	navigate('/Profile')
	// }, [])

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

	const getAddFriendStatus = (): string => {
		// if (data.friendList.find((user) => {return user.friendUser === userClicked.current}) !== undefined)
		// 	return 'Delete friend';
		// else if (userClicked.current?.friendRequests.find((user: User) => {return user.username === userDetails.username}) !== undefined ||
		// 				userDetails.friendRequests.find((user: User) => {return user.username === userClicked.current?.username}))
		// 	return 'Request sent';
		// else if (userClicked.current?.blockedUsers.find((user: User) => {return user.username === userDetails.username}) === undefined)
			return 'Add friend';
		// else
			// return '';
	}

	const getAddFriendDisabled = (): boolean => {
		return (getAddFriendStatus() === 'Request sent')
	}

	const handleUserOptionsClose = () => {
		setOpenUserOptions(false);
	}

  return (
		<div className="m-auto pt-[50px] items-center lg:flex-row  h-[90%] max-h-[750px] w-[90%] max-w-[400px] w-fit">
			<div className='w-full h-[100%] flex flex-col bg-sky-200 rounded-lg m-auto'>
				{data &&
					(
						<>
							<div className='w-full h-[25%] flex'>
								<div className='w-[50%] h-full flex items-center justify-center'>
									{ username === undefined && hover && 
										<div className='absolute mx-auto z-50 h-[35px] w-[35px] hover:cursor-pointer' onMouseEnter={() => setHover(true)} onClick={() => {setOpenEditProfile(true); setHover(false)}}>
											<Edit sx={{color: blue[700], height: 35, width: 35}} />
										</div>
									}
									<img 
										className={`rounded-full h-full border-4 border-blue-700 h-[75%] mx-auto relative ${username === undefined && hover ? 'brightness-[.25] cursor-pointer' : ''}`}
										src={data.imagePath}
										alt="Edit"
										onMouseEnter={() => {if (username === undefined) setHover(true);} }
										onMouseLeave={() => {if (username === undefined) setHover(false);} }
										onClick={() => {if (username === undefined) {setOpenEditProfile(true); setHover(false);}}}
									/>
								</div>
								<div className='w-[50%] h-full flex  mx-auto'>
									<div className='h-fit my-auto'>
										<p className='text-2xl font-bold '>{ data.username }</p>
										<p className="text-lg font-semibold"><span className={getStatusCSS(data.status)}>●</span> {data.status[0].toUpperCase() + data.status.substring(1)}</p>
									</div>
								</div>
							</div>
							<TabContext value={value}>
								<div className='w-[100%] h-fit p-1 mx-auto '>
									<Box>
										<TabList value={value} onChange={handleChange} variant='scrollable' allowScrollButtonsMobile scrollButtons>
												<Tab icon={<History />} label="HISTORY" sx={{ fontWeight: 'bold' }} value="1" />
												<Tab icon={<Favorite />} label="FRIENDS" sx={{ fontWeight: 'bold' }} value="2" />
												{username === undefined &&
													<Tab icon={<PersonAdd />} label="REQUESTS" sx={{ fontWeight: 'bold' }} value="3" />
												}
												<Tab icon={<EmojiEvents />} label="TROPHIES" sx={{ fontWeight: 'bold' }} value="4" />
												<Tab icon={<Equalizer />} label="STATS" sx={{ fontWeight: 'bold' }} value="5" />
										</TabList>
									</Box>
								</div>

								<div className='grow overflow-hidden'>
									<div className='max-h-[100%] overflow-y-scroll overflow-hidden'>
										<TabPanel value="1"><MatchResult data={data} username={username} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
										<TabPanel value="2"><FriendList data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
										{username === undefined &&
											<TabPanel value="3"><FriendRequests data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
										}
										<TabPanel value="4"><Achievements data={data} /></TabPanel>
										<TabPanel value="5">STATS</TabPanel>
									</div>
								</div>
							</TabContext>
						</>
					)
				}
			</div>
			<EditProfile onClose={() => setOpenEditProfile(false)} open={openEditProfile} setOpenSnackbar={setOpenSnackbar} snackbarMsg={snackbarMsg} snackbarSeverity={snackbarSeverity} />
			{/* <UserOptions open={openUserOptions} currentUser={userClicked.current} addFriendStatus={getAddFriendStatus()} btnDisabled={getAddFriendDisabled()} handleSendMessage={(navigate) => {handleSendMessage(userClicked, rooms, setRooms, setRoomCode, setOpenNewRoom, navigate)}} onClose={handleUserOptionsClose} /> */}
			<GeneralSnackbar
        message={snackbarMsg.current}
        open={openSnackbar}
        severity={snackbarSeverity.current}
        onClose={() => setOpenSnackbar(false)}
      />
		</div>
  );
}
