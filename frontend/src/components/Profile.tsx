import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react"
import { Achievement, Matches, User } from 'components/types';
import { getUserDetails } from './Chat/Chat';
import { Tabs, Tab, Box, Typography, Icon } from '@mui/material'
import React, { useState } from 'react';
import { History, Favorite, PersonAdd, EmojiEvents, Equalizer, Lock, WorkspacePremium } from '@mui/icons-material';

function MatchResult({userDetails}: {userDetails: User}) {
  return (
    <div className="mx-auto w-[100%] rounded-md">
			<div className="overflow-x-auto ">
				<div className="inline-block min-w-full overflow-hidden rounded-lg shadow shadow-gray-300 bg-white/[55%] h-full overflow-y-scroll scrollbar-hide">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th className="border-b-2   border-gray-300 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
									Winner
								</th>
								<th colSpan={2} className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
									Result
								</th>
								<th className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
									Loser
								</th>
							</tr>
						</thead>
						
						<tbody>
						{userDetails.matchHistory.map((currentMatch: Matches) => {
							return (
								<tr>
									<td className="w-2/5 border-b border-gray-300  p-3 text-sm">
										<div className="flex items-center">
											<div className="hidden h-10 w-10 shrink-0 sm:table-cell">
												<img
													className="h-full w-full rounded-full"
													src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
													alt=""
												/>
											</div>
											<div className="ml-2">
												<p className=" text-gray-900">{(currentMatch.result === 'win') ? userDetails.username : currentMatch.opponent.username}</p>
											</div>
										</div>
									</td>
									<td className="border-b border-gray-300  p-3 text-sm">
										<p className=" text-center text-gray-900">{(currentMatch.result === 'win') ? currentMatch.scoreUser : currentMatch.scoreOpp}</p>
									</td>
									<td className="border-b border-gray-300  p-3 text-sm">
										<p className=" text-center text-gray-900">{(currentMatch.result === 'loss') ? currentMatch.scoreUser : currentMatch.scoreOpp}</p>
									</td>
									<td className="w-2/5 border-b border-gray-300  p-3 text-sm">
										<div className="float-right flex items-center">
											<div className="mr-2">
												<p className=" text-right text-gray-900">{(currentMatch.result === 'loss') ? userDetails.username : currentMatch.opponent.username}</p>
											</div>
											<div className="hidden h-10 w-10 shrink-0 sm:table-cell">
												<img
													className="h-full w-full rounded-full"
													src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
													alt=""
												/>
											</div>
										</div>
									</td>
								</tr>
							)
						})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function FriendList({userDetails}: {userDetails: User}) {

	const ONLINE = "text-green-600 text-md";
	const PLAYING = "text-amber-500 text-md";
	const OFFLINE = "text-red-600 text-md";

	const getStatusCSS = (currentUser: User) => {
		if (currentUser.status === 'Online')
			return ONLINE;
		else if (currentUser.status === 'Playing')
			return PLAYING;
		else
			return OFFLINE;
	}

  return (
    <div className="flex h-[100%] flex-col -my-4">
      <div className="container-snap rounded-lg dark:border-gray-300 dark:bg-transparent">
        <div className="flow-root overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300"
          >
						{ userDetails.friendList.map((currentUser: User) => {
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
											<p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600">{currentUser.username}</p>
											<p className="text-sm text-gray-500 dark:text-slate-500"><span className={getStatusCSS(currentUser)}>●</span>{currentUser.status}</p>
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

function Achievements({userDetails}: {userDetails: User}) {
	return (
		<div className="w-[100%] h-full rounded-md px-4 pt-0 sm:px-8 ">
			<div className="-mx-4 p-2 sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full shadow shadow-gray-300 bg-white/[55%] h-[420px] overflow-y-scroll scrollbar-hide">
          <table className="min-w-full leading-normal">
            <tbody>
							{ userDetails.achievements.map((currentAchievement: Achievement) => {
								return (
									<tr>
										<td className="border-b border-gray-300  p-3 text-smw-1/4">
											<div className="flex items-center m-auto">
												{ (currentAchievement.achieved) ? (
													<div>
														<div className="w-12 h-12 ">
															<Icon sx={{ width: 32, height: 32, m: 1}}>
																<WorkspacePremium fontSize="large" />
															</Icon>
														</div>
														<div className="min-w-0 flex-1">
															<p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600">{currentAchievement.name}</p>
															<p className="text-sm text-gray-500 dark:text-slate-500">{currentAchievement.description}</p>
														</div>
													</div>
												) : (
													<React.Fragment>
														<div className="w-12 h-12">
															<Lock />
														</div>
														<div className="min-w-0 flex-1">
															<p className="truncate text-md font-semibold text-gray-900 dark:text-slate-600">Locked</p>
														</div>
													</React.Fragment>
												)}
											</div>
										</td>
									</tr>
								);
							})}
            </tbody>
          </table>
        </div>
      </div>
		</div>
	);
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
	const  userDetails: User = getUserDetails();
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="m-auto pt-[50px] items-center lg:flex-row  h-[90%] max-h-[750px] w-[90%] max-w-[400px] w-fit">
			<div className='w-full h-[100%] flex flex-col bg-sky-200 rounded-lg m-auto'>
				<div className='w-full h-[25%] flex'>
					<div className='w-[50%] h-full flex items-center'>
							<img 
								className='rounded-full h-full border-4 border-blue-700 h-[75%] mx-auto'
								src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
								alt=""
							/>
					</div>
					<div className='w-[50%] h-full flex  mx-auto'>
						<div className='h-fit my-auto'>
							<p className='text-2xl font-bold '>{ userDetails.username }</p>
							<p className="text-lg font-semibold"><span className="text-green-600">●</span>Online</p>
						</div>
					</div>
				</div>
				<div className='w-[100%] h-fit p-1 mx-auto '>
					<Tabs value={value} onChange={handleChange} variant='scrollable' allowScrollButtonsMobile scrollButtons>
							<Tab icon={<History />} label="HISTORY" sx={{ fontWeight: 'bold' }} {...a11yProps(0)} />
  						<Tab icon={<Favorite />} label="FRIENDS" sx={{ fontWeight: 'bold' }} {...a11yProps(1)} />
  						<Tab icon={<PersonAdd />} label="REQUESTS" sx={{ fontWeight: 'bold' }} {...a11yProps(2)} />
  						<Tab icon={<EmojiEvents />} label="TROPHIES" sx={{ fontWeight: 'bold' }} {...a11yProps(3)} />
  						<Tab icon={<Equalizer />} label="STATS" sx={{ fontWeight: 'bold' }} {...a11yProps(4)} />
					</Tabs>
				</div>

				<div className='grow overflow-hidden'>
					<div className='max-h-[100%] overflow-y-scroll overflow-hidden'>
						<TabPanel value={value} index={0}><MatchResult userDetails={userDetails} /></TabPanel>
						<TabPanel value={value} index={1}><FriendList userDetails={userDetails} /></TabPanel>
						<TabPanel value={value} index={2}>REQUESTS</TabPanel>
						<TabPanel value={value} index={3}><Achievements userDetails={userDetails} /></TabPanel>
						<TabPanel value={value} index={4}>STATS</TabPanel>
					</div>
				</div>
			</div>
		</div>
  );
}
