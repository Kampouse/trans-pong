import { Tab, Box, IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { GoogleAuth } from 'views/GoogleAuth/google.auth';
import React, { useState, useRef, useEffect } from 'react';
import { History, Favorite, PersonAdd, EmojiEvents, Equalizer, Lock, WorkspacePremium, CheckCircle, Cancel, Edit } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { useParams } from 'react-router';
import { GeneralSnackbar } from 'views/Snackbar/Snackbar';
import { AlertColor } from '@mui/material';
import { UserOption } from '../UserOptions/User.Option'
import { GoogleReset } from 'views/GoogleAuth/google.reset';
import Error404 from 'views/Error/Error404';
import {Fetch } from 'utils'

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
const useFetch = (username) =>
{
	const [profileReq, setProfileReq] = useState<any>(null);
	
	useEffect(() => {
		Fetch('http://localhost:3000/profile' + ((username) ? "/" + username : ""))
            .then((response) => response.json())
			.then((data) => {
				setProfileReq(data);
			})
	}, [username])
	return {profileReq};
}

//  =============== Match history component     =============== //

function MatchResult({data, userClicked, setOpenUserOptions}: {data: any, userClicked: React.MutableRefObject<string | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>})
{
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
                                                <img className={`h-full w-full rounded-full`} src={currentMatch.leftPhoto} alt="" onClick={() =>{userClicked.current = currentMatch.leftPlayer;if (data.username != userClicked.current){setOpenUserOptions(true)}}}/>
                                            </div>
                                            <div className="ml-2">
                                                <p className={`text-gray-900`} onClick={() =>{userClicked.current = currentMatch.leftPlayer;if (data.username != userClicked.current){setOpenUserOptions(true)}}}>
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
                                                <p className={`text-gray-900`} onClick={() =>{userClicked.current = currentMatch.rightPlayer;if (data.username != userClicked.current){setOpenUserOptions(true)}}}>
                                                    {currentMatch.rightPlayer}
                                                </p>
                                            </div>
                                            <div className=" h-[32px] w-[32px] shrink-0 sm:table-cell">
                                                <img className={`h-full w-full rounded-full`} src={currentMatch.rightPhoto} alt="" onClick={() =>{userClicked.current = currentMatch.rightPlayer;if (data.username != userClicked.current){setOpenUserOptions(true)}}}/>
                                            </div>
                                        </div>
                                    </li>
                                );
                    })}
                </ul>
            </div>
        </div>
    </div>);
}

//  =============== Friend List component       =============== //

function FriendList({data, userClicked, setOpenUserOptions}: {data: any, userClicked: React.MutableRefObject<string | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>})
{
    return (
        <div className="flex h-[100%] flex-col -my-4">
            <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
                <div className="flow-root overflow-y-scroll scrollbar-hide">
                    <ul role="list" className="divide-y divide-gray-500 dark:divide-slate-300">
                        {data.friendList.map((currentFriend) =>
                        {
                            return (
                                <li className="py-4" key={currentFriend.friendUser}>
                                    <div className="flex items-center space-x-4">
                                        <div className="shrink-0">
                                            <img className="h-12 w-12 border-2 border-blue-700 rounded-full hover:border-pink-500 hover:cursor-pointer" src={currentFriend.friendPhoto} alt="" onClick={() => {userClicked.current = currentFriend.friendUser;setOpenUserOptions(true);}}/>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600 hover:cursor-pointer hover:underline underline-offset-2" onClick={() => {userClicked.current = currentFriend.friendUser;setOpenUserOptions(true); }}>
                                                {currentFriend.friendUser}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-slate-500"><span className={getStatusCSS(currentFriend.friendStatus)}>???</span> {currentFriend.friendStatus[0].toUpperCase() + currentFriend.friendStatus.substring(1)}</p>
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

//  Accept request GET request
async function acceptRequest(username: string)
{
    await fetch('http://localhost:3000/profile/add/' + username)
    .then(function(){})
    .catch(function() {console.log("error on accept friend request fetch");});
    window.location.reload();
}

async function denyRequest(username: string)
{
    await fetch('http://localhost:3000/profile/deny/' + username)
    .then(function(){})
    .catch(function() {console.log("error on deny request fetch");});
    window.location.reload();
}

function FriendRequests({data, userClicked, setOpenUserOptions}: {data: any, userClicked: React.MutableRefObject<string | null>, setOpenUserOptions: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {

    return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul role="list" className="divide-y divide-gray-500 dark:divide-slate-300">
            { data.friendRequests.map((currentRequest) =>
            {
                return (
                    <li className="py-4" key={currentRequest.fromUser}>
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img className="h-12 w-12 border-2 border-blue-700 rounded-full hover:border-pink-500 hover:cursor-pointer" src={currentRequest.fromPhoto} alt="" onClick={() => {userClicked.current = currentRequest.fromUser;setOpenUserOptions(true);}}
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-semibold text-gray-900 dark:text-slate-600 hover:cursor-pointer hover:underline underline-offset-2" onClick={() => {userClicked.current = currentRequest.fromUser;setOpenUserOptions(true);}}
                                >
                                    {currentRequest.fromUser}
                                </p>
                            </div>
                            <div className='flex w-fit justify-end'>
                                <IconButton onClick={() => {acceptRequest(currentRequest.fromUser);}}>
                                    <CheckCircle sx={{ color: blue[700] }} />
                                </IconButton>
                                <IconButton onClick={() => {denyRequest(currentRequest.fromUser);}}>
                                    <Cancel sx={{ color: blue[700] }} />
                                </IconButton>
                            </div>
                        </div>
                    </li>);})}
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
    <div className="h-[100%]">
        <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent font-Raleway font-extrabold font-lg text-md">
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
    data: any
}

export function EditProfile({open, onClose, data} : EditProfileProps)
{
    //  =============== Google auth             =============== //
    
    const [openGoogleAuth, setGoogleAuth] = useState(false);
    const [openGoogleReset, setGoogleReset] = useState(false);

    //  Edit profile without authentificator activated

    return (
        <Dialog onClose={onClose} open={open} className="font-Raleway">
        <div className=" w-96">
            <DialogTitle className='bg-sky-200'>
                <p className=' text-center font-Raleway font-bold text-3xl '>
                    Edit Profile
                </p>
            </DialogTitle>
            <DialogContent className="bg-sky-200 flex flex-col">
                <div className='my-2'>
                    <p className=' font-Raleway font-bold text-center my-2 px-1 text-lg'>
                        Change username
                    </p>
                    <div className=''>
                        <form action='http://localhost:3000/profile/update/username' method='POST'>
                            <input name="newUsername" id="newUsername" type="text" className='text-center h-fit w-fit my-2 px-8 mx-[10%]' placeholder="Enter New Display Name"/>
                            <button className='hover:bg-purple-200 hover:text-black h-fit w-fit my-2 mx-[36%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Apply</button>
                        </form>
                    </div>
                </div>
                <div className='my-2'>
                    <p className='font-Raleway font-bold text-center my-2 px-1 text-lg'>
                        Upload new Photo
                    </p>
                    <div>
                        <form action='http://localhost:3000/profile/upload/photo' method='POST' encType='multipart/form-data'>
                            <input accept="image/*" type="file" name='file' className=' justify-center'></input>
                            <button className='hover:bg-purple-200 hover:text-black h-fit w-fit my-2 mx-[35%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Upload</button>
                        </form>
                    </div>
                </div>
                <div className=' text-center my-2 px-1 '>
                    <p className='py-1 font-Raleway font-bold text-lg'>Google Authenticator</p>
                    <p className='py-1 text-sm'></p>
                    <div>
                        <button className='hover:bg-purple-200 hover:text-black h-fit w-fit my-2 mx-[33%] px-5 text-lg rounded-md bg-[#1976d2] text-white'
                            onClick=
                            {() =>
                                {
                                    if (data.authentificator == false)
                                    {
                                        setGoogleAuth(true);
                                    }
                                    else
                                    {
                                        setGoogleReset(true);
                                    }
                                }}>
                            Settings
                        </button>
                    </div>
                </div>
            </DialogContent>
            </div>
            <GoogleAuth open={openGoogleAuth} onClose={() => setGoogleAuth(false)}></GoogleAuth>
            <GoogleReset open={openGoogleReset} onClose={() => setGoogleReset(false)}></GoogleReset>
            </Dialog>
            );
}

//  =============== Profile component           =============== //

export default function Profile()
{

    //  =============== View options            =============== //
    /*
        Value usestate is used to know what option is selected between profile information:
            1 == Match history
            2 == Friend request
            3 == Friend Requests
            4 == Achievements
            5 == Game stats
    */

    const [value, setValue] = useState("1");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {setValue(newValue);};

    //  =============== User options            =============== //
    /*
        User options is option's when you click on a user.
        This is here that we want to possibly:
        1) View user profile
        2) Add this user
        3) Invite this user to play a pong game
        4) Invite this user to chat
        5) Block this user
    */

    //  True or false (if we should render user option's)
    const [openUserOptions, setOpenUserOptions] = useState(false);

    //  The user that is clicked (information to do logic with user options)
    const userClicked = useRef("none");

    //  Usestate on hover a user ?
    const [hover, setHover] = useState(false);

    //  =============== Edit Profile            =============== //
    const [openEditProfile, setOpenEditProfile] = useState(false);

    //  =============== ScnackBar               =============== //

    /*
        Initially we were using snackbar for displaying succes or not
        on user edit information. Right now the backend with edit option
        is done, and since the page get refresh, the snackbar was not
        displayed.
        TODO :  Implement edit user information error message or success
                on the snackbar after:
                    1) User edit options
                    2) Friend requests (sent or accepted)
                    3) Block a user
                    4) Invite to game's ?
                    5) Invite to chat ?
                    6) Matchmaking Queue status?
                    7) Achievement unlocked displayed here?
    */

    //  Whether we open the snackbar or close it
    const [openSnackbar, setOpenSnackbar] = useState(false);

    //  Snack Bar message displayed
    const snackbarMsg = useRef('')

    //  Snack Bar Severity difine the color of the snackbar
    const snackbarSeverity = useRef<AlertColor | undefined>('success')

    //  =============== Profile information     =============== //

    /*
        If the user is on DNS/profile :
            Get private profile information (edit options and friend requests)
        If the user is on DNS/profile/username :
            Get the public profile information (edit option disactivated)
    */

    const { username } = useParams();
	const {profileReq: data} = useFetch(username);

    if (data && data.error == true)
    {
        return (<Error404></Error404>);
    }

    return (
    <div className="m-auto pt-[50px] items-center lg:flex-row  h-[90%] max-h-[750px] w-[90%] max-w-[700px] font-Raleway">
        <div className='w-full h-[100%] flex flex-col bg-sky-200 rounded-lg m-auto'>
            {data && (
            <>
            <div className='w-full h-[30%] flex py-4 px-5'>
                <div className='w-fit h-full flex'>
                    {username === undefined && hover && 
                    <div className='absolute mx-auto z-50 h-[35px] w-[35px] hover:cursor-pointer' onMouseEnter={() => setHover(true)} onClick={() => {setOpenEditProfile(true); setHover(false)}}>
                        <Edit sx={{color: blue[700], height: 35, width: 35}} />
                    </div>}
                    <img className={`rounded-full h-full border-4 border-blue-700 mx-auto relative ${username === undefined && hover ? 'brightness-[.25] cursor-pointer' : ''}`}
                        src={data.imagePath}
                        alt="Edit"
                        onMouseEnter={() => {if (username === undefined) setHover(true);} }
                        onMouseLeave={() => {if (username === undefined) setHover(false);} }
                        onClick={() => {if (username === undefined) {setOpenEditProfile(true); setHover(false);}}}/>
                </div>
                <div className='w-[50%] h-full flex mx-auto'>
                    <div className='h-fit my-auto'>
                        <p className='text-4xl font-Merriweather '>{ data.username }</p>
                        <p className="text-lg font-Merriweather pt-2"><span className={getStatusCSS(data.status)}>???</span> {data.status[0].toUpperCase() + data.status.substring(1)}</p>
                    </div>
                </div>
            </div>
            <TabContext value={value}>
                <div className='w-[100%] h-fit p-1 mx-auto '>
                    <Box>
                        <TabList value={value} onChange={handleChange} variant='scrollable' allowScrollButtonsMobile scrollButtons>
                            <Tab icon={<History />} label="Match History" sx={{ fontWeight: 'bold' }} value="1" />
                            <Tab icon={<Favorite />} label="Friends" sx={{ fontWeight: 'bold' }} value="2" />
                                {username === undefined && <Tab icon={<PersonAdd />} label="Friend Requests" sx={{ fontWeight: 'bold' }} value="3" />}
                            <Tab icon={<EmojiEvents />} label="Achievements" sx={{ fontWeight: 'bold' }} value="4" />
                            <Tab icon={<Equalizer />} label="Statistics" sx={{ fontWeight: 'bold' }} value="5" />
                        </TabList>
                    </Box>
                </div>
                <div className='grow overflow-hidden'>
                    <div className='max-h-[100%] overflow-y-scroll overflow-hidden'>
                        <TabPanel value="1"><MatchResult data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
                        <TabPanel value="2"><FriendList data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>
                            {username === undefined && <TabPanel value="3"><FriendRequests data={data} userClicked={userClicked} setOpenUserOptions={setOpenUserOptions}/></TabPanel>}
                        <TabPanel value="4"><Achievements data={data} /></TabPanel>
                        <TabPanel value="5"><Stats data={data} /></TabPanel>
                    </div>
                </div>
            </TabContext>
            </>)}
        </div>
        <UserOption onClose={() => setOpenUserOptions(false)} open={openUserOptions} userClicked={userClicked}></UserOption>
        <EditProfile onClose={() => setOpenEditProfile(false)} open={openEditProfile} setOpenSnackbar={setOpenSnackbar} snackbarMsg={snackbarMsg} snackbarSeverity={snackbarSeverity} data={data}/>
        <GeneralSnackbar message={snackbarMsg.current} open={openSnackbar} severity={snackbarSeverity.current} onClose={() => setOpenSnackbar(false)}/>
    </div>
  );
}