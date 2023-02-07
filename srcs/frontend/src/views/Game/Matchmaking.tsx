import { useEffect, useRef, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import * as io from 'socket.io-client';
import  Queue  from './QueueComponent';
import { Fetch } from 'utils';
import { Dialog } from '@mui/material'
import { render } from 'react-dom';
import { GeneralSnackbar } from 'views/Snackbar/Snackbar';

export var usersocket: io.Socket = io.connect("http://localhost:3001")
export const userid = await getUserId();
export var pingInterval = setInterval( async () => {
    if (userid != "" && userid != null) //userid not empty so we know suer is logged in
        usersocket.emit("ping", userid) //ping with userid to tell if user is alive
}, 5000) //every 10 seconds or whatever

export default function Matchmaking()
{

    const nav = useNavigate();
    //usersocket.disconnect(); //automatically disconnect socket on render
    const userid = fetchUserId();
    const [openQueue, setOpenQueue] = useState(false);
    const snackbarMsg = useRef('')
	const [openSnackbar, setOpenSnackbar] = useState(false)
/*
    useEffect(() => {
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
            usersocket.emit("registerId", {userId: userid, socket: socketId}); //sending id because we cant send the socket over, so we will retrieve it on the server side
            usersocket.emit("searchGame"); //join new game
        // setOpenSnackbar(true)
            //TODO: Fix this state disconnecting sockets for some reason on render, which is extremly stupid
        })
        usersocket.on("noSuitableRoomFound", () => {
            usersocket.emit("socketIsConnected"); //fire again to relaunch a search, if we land here we didnt find a room thats it (mostly due to same user found but yea)
        })
    })
*/
    return (
    <div className=" my-4 px-[10%] py-[10%] mx-2 w-[100%]">
            <div className="flex flex-col rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm px-20">
                <h1 className="text-center text-6xl pt-10 pb-40 font-Merriweather">Matchmaking</h1>
                <div className="pb-12 flex flex-row items-center justify-center px-10">
                    <button type='button' id="singleplayer" onClick={(e) => startSinglePlayer(e, nav)} className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                        Single Player
                    </button>
                    <button type='button' id="multiplayer" onClick={((e) => startMultiplayerMatchmake(e, nav, userid, setOpenQueue))} className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                        Multi Player
                    </button>
                </div>
            </div>
            <div id="divqueue"><Queue onClose={() => setOpenQueue(false)} open={openQueue}></Queue></div>
    </div>
    )
}

function startSinglePlayer(e, nav: NavigateFunction){
	e.preventDefault();
	nav('/game');
}

async function getUserId(): Promise<string>
{
    var userid;
    await Fetch ('api/profile/get/userid')
        .then((response) => response.json())
        .catch((err) => {
            return ("None");
        })
        .then((data) => {
           userid = data.userid;
        })
    return userid;
}

function fetchUserId() {
    const [userId, setUserId] = useState<any>(null);

    useEffect(() => {
		Fetch ('api/profile/get/userid')
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
    //setOpenQueue(true);
    usersocket = io.connect("http://localhost:3001")
    //usersocket.connect()
    alert("Waiting for other player...")
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
        usersocket.emit("registerId", {userId: userid, socket: socketId}); //sending id because we cant send the socket over, so we will retrieve it on the server side
        usersocket.emit("searchGame"); //join new game
       // setOpenSnackbar(true)
        //TODO: Fix this state disconnecting sockets for some reason on render, which is extremly stupid
    })
    usersocket.on("noSuitableRoomFound", () => {
        usersocket.emit("socketIsConnected"); //fire again to relaunch a search, if we land here we didnt find a room thats it (mostly due to same user found but yea)
    })
}
