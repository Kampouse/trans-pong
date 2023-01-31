import { ActiveGameDto, Game } from 'utils/game.dto';
import { useState } from 'react';
import * as io from 'socket.io-client';
import { useNavigate } from 'react-router';
import {usersocket} from './Matchmaking'
import { Fetch } from 'utils';

async function getActiveGames(data: ActiveGameDto, setData)
{
    await Fetch("http://localhost:8000/profile/active/game")
        .then(response => response.json())
        .then(res => {
            if (res.status == '200')
            {
                let Games: Game[] = res.message.games;
                setData({games: Games});
                return;
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

export function SpectateMenu()
{
    let emptyGames: Game[] = [];
    const [data, setData] = useState(new ActiveGameDto(emptyGames));
    const nav = useNavigate();
    return (
        <div className="m-auto pt-[50px] items-center lg:flex-row  h-[90%] max-h-[900px] w-[90%] max-w-[700px] font-Raleway">
            <button className=' ring-1 ring-black hover:bg-purple-200 hover:text-black h-14 w-40 my-4 mx-[39%] px-5 text-xl rounded-md bg-sky-200 text-black' onClick={async () => 
            {
                await getActiveGames(data, setData);
            }}>
                Refresh
            </button>
            <div className='w-full h-[100%] flex flex-col bg-sky-200 rounded-lg m-auto'>
                <div className='h-hit w-full my-4'>
                    <p className='text-4xl font-Merriweather text-center'>Live Matches</p>
                </div>
                <div className='grow overflow-hidden w-[90%] mx-auto flow-root overflow-y-scroll scrollbar-hide pb-2'>
                {data && ( <>
                <ul role="list" className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg">
                    <li className="flex h-[40px] w-full" key="TopList">
                    <div className="w-[30%] my-auto text-center"><p>Left Player</p></div>
                    <div className="w-[20%] my-auto text-center"><p>VS</p></div>
                    <div className="w-[30%] my-auto text-center"><p>Right Player</p></div>
                    <div className="w-[20%] my-auto text-center"></div>
                </li>
                    {data.games.map((currentMatch) =>
                    {
                      return (
                        <li className="flex py-4" key={currentMatch.gameID}>
                            <div className="flex w-[30%] my-auto items-center ml-2">
                                <div className="h-[32px] w-[32px] shrink-0 sm:table-cell">
                                    <img className={`h-full w-full border-2 border-blue-700 rounded-full`} src={currentMatch.leftPlayerPhoto} alt=""/>
                                </div>
                                <div className="ml-2">
                                    <p className={`text-gray-900`}>
                                        {currentMatch.leftPlayer}
                                    </p>
                                </div>
                            </div>
                            <div className="flex h-full w-[20%] my-auto justify-center">
                               <p className=" text-center text-gray-900">VS</p>
                            </div>
                            <div className="flex w-[30%] my-auto justify-end items-center mr-2">
                                <div className="mr-2">
                                    <p className={`text-gray-900`}>
                                        {currentMatch.rightPlayer}
                                    </p>
                                </div>
                                <div className=" h-[32px] w-[32px] shrink-0 sm:table-cell">
                                    <img className={`h-full w-full border-2 border-blue-700 rounded-full`} src={currentMatch.rightPlayerPhoto} alt=""/>
                                </div>
                            </div>
                            <div className="flex h-full w-[20%] m-auto justify-center">
                               <button className='bg-pink-500 text-white font-Merriweather rounded-md font-medium px-2 py-1' onClick={async () => 
                                    {
                                        //  Open the game component here with gameRoomId stored in : currentMatch.gameID
                                        usersocket.emit("spectateGame", currentMatch.gameID);
                                        usersocket.on("roomIsReady", () => {
                                            usersocket.off("roomIsReady");
                                            nav(`/game/${currentMatch.gameID}`)
                                        })
                                        console.log("TODO: add opening game in spectator mode here");
                                    }}>
                                    Spectate
                                </button>
                            </div>
                        </li>);})}
                    </ul>
                    </>)}
                </div>
            </div>
        </div>
  )
}
