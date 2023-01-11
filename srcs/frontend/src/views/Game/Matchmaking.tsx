import { useEffect, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import * as io from 'socket.io-client';
import { Queue } from './QueueComponent';
import { Fetch } from 'utils';
import { Dialog } from '@mui/material'
import { render } from 'react-dom';

export var usersocket: io.Socket = io.connect();

export default function Matchmaking()
{
    const nav = useNavigate();
    usersocket.disconnect(); //automatically disconnect socket on render
    const userid = fetchUserId();
    const [openQueue, setOpenQueue] = useState(false);
    const [socket, setSocket] = useState()

    return (
    <div className=" my-4 px-[10%] py-[10%] mx-2 w-[100%]">
            <div className="flex flex-col rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm px-20">
                <h1 className="text-center text-6xl pt-10 pb-40 font-Merriweather">Matchmaking</h1>
                <div className="pb-12 flex flex-row items-center justify-center px-10">
                    <button type='button' id="singleplayer" onClick={(e) => startSinglePlayer(e, nav)} className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                        Singler Player
                    </button>
                    <button type='button' id="multiplayer" onClick={((e) => startMultiplayerMatchmake(e, nav, userid, setOpenQueue, setSocket))} className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                        Multi Player
                    </button>
                </div>
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

function startMultiplayerMatchmake(e, nav: NavigateFunction, userid: string, setOpenQueue: any, setSocket: any){
    e.preventDefault();
    console.log("Creating socket");
    usersocket.disconnect();
    //setOpenQueue(true);

    usersocket = io.connect("http://localhost:3001")
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
        setOpenQueue(true);
        //TODO: Fix this state disconnecting sockets for some reason on render, which is extremly stupid
    })

}

/*
function Queue({open, onClose, userid})
{
    /*
    console.log(userid)
    const nav = useNavigate();
    usersocket = io.connect("http://localhost:3001")
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
        //setOpenQueue(true);
        //TODO: Fix this state disconnecting sockets for some reason on render, which is extremly stupid
    })
    *//*
    return (
        <Dialog onClose={onClose} open={open}>
            <div className='w-[400px] h-[100px] bg-sky-100 pt-1'>
                <p className="text-xl text-center py-6 font-Merriweather">
                    Waiting for an opponent...
                </p>
            </div>
            <div className='bg-sky-100 px-[40%] pb-4'>
                <button className='w-20 h-10 hover:bg-purple-200 font-Merriweather text-xl rounded-lg ring-1 ring-slate-500 bg-sky-200' onClick={() => {onClose()}}>
                    Cancel
                </button>
            </div>
        </Dialog>
    );
    
}
*/