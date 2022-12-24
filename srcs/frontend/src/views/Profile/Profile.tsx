import { User } from '../../utils/types';
import { Tab, Box, IconButton, Dialog, DialogContent, DialogTitle, Switch } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useState, useRef, useEffect } from 'react';
import { History, Favorite, PersonAdd, EmojiEvents, Equalizer, Lock, WorkspacePremium, CheckCircle, Cancel, Edit } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { useParams } from 'react-router';
import { GeneralSnackbar } from 'views/Snackbar/Snackbar';
import { AlertColor } from '@mui/material';
import { UserOption } from '../UserOptions/User.Option'

//  =============== User status         =============== //

/*
    Here, we have the text and the color to display user
    status information
*/

const ONLINE = "text-green-600 text-md";
const PLAYING = "text-amber-500 text-md";
const OFFLINE = "text-red-600 text-md";

const getStatusCSS = (status) =>
{
	if (status === 'online')
    {
        return ONLINE;
    }
    else if (status === 'playing')
    {
        return PLAYING;
    }
    else
    {
        return OFFLINE;
    }
}

//  =============== Fetch database info =============== //

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

//  =============== Match history component     =============== //

function MatchResult({data, userClicked, setOpenUserOptions}: {data: any, userClicked: React.MutableRefObject<User | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>})
{
    function onUserClick(user: string)
    {
        console.log("open user option of " + user);
        return (<UserOption user={user}></UserOption>);
    }

    return (
    <div className="flex h-[100%] flex-col -my-4">
        <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
            <div className="flow-root overflow-y-scroll scrollbar-hide">
                <ul role="list" className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg">
                    <li className="flex h-[40px] w-full" key="TopList">
                    <div className="w-[37%] my-auto text-center"><p>Left Player</p></div>
                    <div className="w-[26%] my-auto text-center"><p>Result</p></div>
                    <div className="w-[37%] my-auto text-center"><p>Right Player</p></div>
                    </li>
                    {data.matchHistory.map((currentMatch) =>
                    {
                        return (
                                    <li className="flex py-4" key={currentMatch.matchNum}>
                                        <div className="flex w-[37%] my-auto items-center ml-2">
                                            <div className="h-[32px] w-[32px] shrink-0 sm:table-cell">
                                                <img className={`h-full w-full rounded-full`} src={currentMatch.leftPhoto} alt="" />
                                            </div>
                                            <div className="ml-2">
                                                <p className={`text-gray-900`} onClick={() => {onUserClick(currentMatch.leftPlayer)}}>
                                                    {currentMatch.leftPlayer}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex h-full w-[26%] my-auto">
                                            <div className="w-[50%] my-auto">
                                                <p className=" text-center text-gray-900">{currentMatch.leftScore}</p>
                                            </div>
                                            <div className="w-[50%] my-auto">
                                                <p className=" text-center text-gray-900">{currentMatch.rightScore}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-[37%] my-auto justify-end items-center mr-2">
                                            <div className="mr-2">
                                                <p className={`text-gray-900`} onClick={ () => {onUserClick(currentMatch.rightPlayer)}}>
                                                    {currentMatch.rightPlayer}
                                                </p>
                                            </div>
                                            <div className=" h-[32px] w-[32px] shrink-0 sm:table-cell">
                                                <img className={`h-full w-full rounded-full`} src={currentMatch.rightPhoto} alt="" />
                                            </div>
                                        </div>
                                    </li>
                                );
                    })}
                </ul>
            </div>
        </div>
    </div>);}

//  =============== Friend List component       =============== //

function FriendList({data, userClicked, setOpenUserOptions}: {data: any, userClicked: React.MutableRefObject<string | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>})
{
  return (
    <div className="flex h-[100%] flex-col -my-4">
        <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
            <div className="flow-root overflow-y-scroll scrollbar-hide">
                <ul role="list" className="divide-y divide-gray-500 dark:divide-slate-300">
                    {data.friendList.map((currentUser) =>
                    {
                        return (
                            <li className="py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="shrink-0">
                                        <img className="h-12 w-12 border-2 border-blue-700 rounded-full hover:border-pink-500 hover:cursor-pointer" src={currentUser.friendPhoto} alt="" onClick={() => {setOpenUserOptions(true); userClicked.current = currentUser;}}/>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600 hover:cursor-pointer hover:underline underline-offset-2" onClick={() => {setOpenUserOptions(true); userClicked.current = currentUser;}}>
                                            {currentUser.friendUser}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-slate-500"><span className={getStatusCSS(currentUser.friendStatus)}>●</span> {currentUser.friendStatus[0].toUpperCase() + currentUser.friendStatus.substring(1)}</p>
                                    </div>
                                </div>
                            </li>);
                    })}
                </ul>
            </div>
        </div>
    </div>
  );
}

//  =============== Friend requests component   =============== //

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

//  =============== Achievement component       =============== //

function Achievements({data}: {data: any}) {
	return (
		<div className="flex h-[100%] flex-col -my-4">
            <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
                <div className="flow-root overflow-y-scroll scrollbar-hide">
                    <ul role="list" className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg">
						{ data.achievement.map((currentAchievement) =>
                        {
							return (
								<li className="py-4">
									<div className="flex items-center m-auto">
										{
                                            (currentAchievement.achieved) ? 
                                            ( <React.Fragment>
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
										    )
                                            : 
                                            (
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
										    )
                                        }
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


//  =============== Stats component       =============== //

function Stats({data}: {data: any})
{
    var played = data.stats.played;
    var win = data.stats.win;
    var ratio = data.stats.winRatio;
    ratio = (ratio * 100).toPrecision(4) + ' %';
    var leftPlayed = data.stats.leftPlayed;
    var leftWin = data.stats.leftWin;
    var leftRatio = data.stats.leftWinRatio;
    leftRatio = (leftRatio * 100).toPrecision(4) + ' %'
    var rightPlayed = data.stats.rightPlayed;
    var rightWin = data.stats.rightWin;
    var rightRatio = data.stats.rightWinRatio;
    rightRatio = (rightRatio * 100).toPrecision(4) + ' %'
    var classInfo = 'py-2 pl-16'

    return (
    <div className="h-[100%] my-1">
        <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent font-Merriweather">
            <div>
                <div className={classInfo}>
                    Total game played :
                    <label className='float-right pr-16'> {played}</label>
                </div>
                <div className={classInfo}>
                    Total game won :
                    <label className='float-right pr-16'> {win}</label>
                </div>
                <div className={classInfo}>
                    Win ratio :
                    <label className='float-right pr-16'> {ratio}</label>
                </div>
                <div className={classInfo}>
                    Right game played :
                    <label className='float-right pr-16'> {rightPlayed}</label>
                </div>
                <div className={classInfo}>
                    Right game won : 
                    <label className='float-right pr-16'> {rightWin}</label>
                </div>
                <div className={classInfo}>
                    Right game ratio : 
                    <label className='float-right pr-16'> {rightRatio}</label>
                </div>
                <div className={classInfo}>
                    Left game played : 
                    <label className='float-right pr-16'> {leftPlayed}</label>
                </div>
                <div className={classInfo}>
                    Left game won : 
                    <label className='float-right pr-16'> {leftWin}</label>
                </div>
                <div className={classInfo}>
                    Left game ratio : 
                    <label className='float-right pr-16'> {leftRatio}</label>
                </div>
            </div>
        </div>
    </div>);
}

//  =============== Edit profile component      =============== //


export interface EditProfileProps
{
	open: boolean;
	onClose: () => void;
	setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
	snackbarMsg: React.MutableRefObject<string>;
	snackbarSeverity: React.MutableRefObject<AlertColor | undefined>;
}


export function EditProfile({ open, onClose} : EditProfileProps)
{
	const [isChecked, setIsChecked] = useState(false);

	return (
		<Dialog onClose={onClose} open={open} className="font-Merriweather">
        <div className=" w-96">
			<DialogTitle className='bg-sky-200'>
                <p className=' text-center font-Merriweather font-bold text-3xl '>
                    Edit Profile
                </p>
			</DialogTitle>
			<DialogContent className="bg-sky-200 flex flex-col">
                <div className='my-2'>
				    <p className='font-bold text-center my-2 px-1 text-lg'>
                        Change username
                    </p>
				    <div className=''>
                        <form action='http://localhost:3000/profile/update/username' method='POST'>
					        <input name="newUsername" id="newUsername" type="text" className='text-center h-fit w-fit my-2 px-5 mx-[10%]' placeholder="Enter New Display Name"/>
					        <button className='h-fit w-fit my-2 mx-[38%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Apply</button>
                        </form>
				    </div>
                </div>
                <div className='my-2'>
				    <p className='font-bold text-center my-2 px-1 text-lg'>
                        Upload new Photo
                    </p>
                    <div>
                        <form action='http://localhost:3000/profile/upload/photo' method='POST' encType='multipart/form-data'>
                                <input accept="image/*" type="file" name='file' className=' justify-center'></input>
                                <button className='h-fit w-fit my-2 mx-[38%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Upload</button>
                        </form>
                    </div>
                </div>
                <div className='my-2'>
				    <p className='py-1'>2-Way Authentification</p>
				    <div className='flex pl-8 h-fit w-fit'>
					    <Switch checked={isChecked} onChange={(evt) => {setIsChecked(evt.target.checked)}} />
				    </div>
                </div>
			</DialogContent>
        </div>
		</Dialog>
	);
}

//  =============== Profile component           =============== //

export default function Profile()
{
	const [value, setValue] = useState("1");
	const [openUserOptions, setOpenUserOptions] = useState(false);
	const [hover, setHover] = useState(false);
	const [openEditProfile, setOpenEditProfile] = useState(false);
	const userClicked = useRef(null);

    //  Snackbar code for error handeling (maybe? ask gasselin)
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const snackbarMsg = useRef('')
    const snackbarSeverity = useRef<AlertColor | undefined>('success')

    //  Get the username with use params
	const { username } = useParams();

    //  Get the JSON data from the fetch method
	const {profileReq: data} = useFetch(username);

    //  Handle the change of username
	const handleChange = (event: React.SyntheticEvent, newValue: string) => 
    {
        setValue(newValue);
    };

  return (
		<div className="m-auto pt-[50px] items-center lg:flex-row  h-[90%] max-h-[750px] w-[90%] max-w-[400px] w-fit font-Merriweather">
			<div className='w-full h-[100%] flex flex-col bg-sky-200 rounded-lg m-auto'>
				{data &&
					(
						<>
							<div className='w-full h-[25%] flex'>
								<div className='w-fit h-full px-2 flex items-center justify-center'>
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
										<p className='text-3xl font-bold '>{ data.username }</p>
										<p className="text-lg"><span className={getStatusCSS(data.status)}>●</span> {data.status[0].toUpperCase() + data.status.substring(1)}</p>
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
										<TabPanel value="1"><MatchResult data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
										<TabPanel value="2"><FriendList data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
										{username === undefined &&
											<TabPanel value="3"><FriendRequests data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
										}
										<TabPanel value="4"><Achievements data={data} /></TabPanel>
										<TabPanel value="5"><Stats data={data} /></TabPanel>
									</div>
								</div>
							</TabContext>
						</>
					)
				}
			</div>
			<EditProfile onClose={() => setOpenEditProfile(false)} open={openEditProfile} setOpenSnackbar={setOpenSnackbar} snackbarMsg={snackbarMsg} snackbarSeverity={snackbarSeverity} />
			<GeneralSnackbar message={snackbarMsg.current} open={openSnackbar} severity={snackbarSeverity.current} onClose={() => setOpenSnackbar(false)}/>
		</div>
  );
}
