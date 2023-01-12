import { useEffect, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import * as io from 'socket.io-client';
import { Queue } from './QueueComponent';
import { Fetch } from 'utils';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export var usersocket: io.Socket = io.connect();

export default function Matchmaking()
{
    const nav = useNavigate();
    usersocket.disconnect(); //automatically disconnect socket on render
    const userid = fetchUserId();
    const [openQueue, setOpenQueue] = useState(false);
		const [waitingOpp, setWaitingOpp] = useState(false);

    return (
    	<div className=" my-4 px-[10%] py-[10%] mx-2 w-[100%]">
	        <div className="flex flex-col rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm px-20">
	            <h1 className="text-center text-6xl pt-10 pb-40 font-Merriweather">Matchmaking</h1>
	            <div className="pb-12 flex flex-row items-center justify-center px-10">
	                <button
										type='button'
										id="singleplayer"
										onClick={(e) => startSinglePlayer(e, nav)}
										className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200"
									>
	                  	Single Player
	                </button>
	                <button
										type='button'
										id="multiplayer"
										onClick={(e) => {startMultiplayerMatchmake(e, nav, userid, setOpenQueue); setWaitingOpp(true);}}
										className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200"
									>
	                    Multi Player
	                </button>
	            </div>

							<div className='mx-auto'>
								<p className='text-3xl mb-2'>Controls</p>
							</div>							
							<div className='flex mx-auto pb-8'>
								<div className='border border-black rounded-lg mr-2'>
									<KeyboardArrowUp fontSize='large'/>
								</div>
								<div className='h-full my-auto'>
									<p className='text-2xl'>Move Up</p>
								</div>
								<div className='border border-black rounded-lg ml-6 mr-2'>
									<KeyboardArrowDown fontSize='large'/>
								</div>
								<div className='h-full my-auto'>
									<p className='text-2xl'>Move Down</p>
								</div>
							</div>

							{waitingOpp && (
								<>
									<div className='flex mx-auto pb-8'>
										<div className='h-full my-auto mr-6'>
											<p className='text-xl font-Merriweather'>Waiting for opponent...</p>
										</div>
										<button
											type='button'
											id="multiplayer"
											onClick={() => setWaitingOpp(false)}
											className=" hover:bg-purple-200 font-Merriweather text-xl rounded-lg ring-1 ring-slate-500 py-2 px-4 bg-sky-200"
										>
											Cancel
										</button>
									</div>
								</>
							)}
	        </div>
	        <Queue onClose={() => setOpenQueue(false)} open={openQueue}></Queue>
   		</div>
    )
}

function startSinglePlayer(e, nav: NavigateFunction){
	e.preventDefault();
	nav('/game');
}

function fetchUserId() {
    const [userId, setUserId] = useState<any>(null);

    useEffect(() => {
		Fetch ('http://localhost:3000/profile/get/userid')
        .then((response) => response.json())
        .then((data) => {
            setUserId(data.userid);
        })
	})
    return(userId)
}

function startMultiplayerMatchmake(e, nav: NavigateFunction, userid: string, setOpenQueue: any){
    e.preventDefault();
    console.log("Creating socket");
    usersocket.disconnect();
    usersocket = io.connect("http://localhost:3001");

    usersocket.on("roomIsReady", (room) =>
    {
        console.log("Match found! Redirecting to game.");
        console.log(room);
        nav(`/game/${room}`, {state:{socketid: usersocket.id}}); //pass socketid to retrieve it on the other side
    })
    usersocket.on("connect", () => {
        console.log(usersocket.id)
        usersocket.emit("socketIsConnected");
    })
    usersocket.on("ack", (socketId) => {
        console.log(userid)
        usersocket.emit("registerId", {userId: userid, socket: usersocket.id}); //sending id because we cant send the socket over, so we will retrieve it on the server side
        usersocket.emit("searchGame"); //join new game
    })
    // setOpenQueue(true);
}
