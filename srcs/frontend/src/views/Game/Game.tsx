import ReactiveCanvas from './components/ReactiveCanvas'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router'
import * as io from 'socket.io-client';
import {usersocket} from "./Matchmaking"

var onlyonce = 0; //prevent functions being called twice
function prepareGame(){
  console.log("Wee woo we joined the room")
  usersocket.emit("playerReady");
}

export default function Game() {
  prepareGame();
  onlyonce = 1;
  return <ReactiveCanvas />
}

const useFetch = (username) =>
{
	const [profileReq, setProfileReq] = useState<any>(null);
	
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

export function GameWatch() {
	const {profileReq: data} = useFetch(undefined);
	console.log(data);

  return (
    <div className="m-auto pt-[50px] items-center lg:flex-row  h-[90%] max-h-[750px] w-[90%] max-w-[700px] font-Raleway">
			<div className='w-full h-[100%] flex flex-col bg-sky-200 rounded-lg m-auto'>
				<div className='h-hit w-full my-4'>
					<p className='text-4xl font-Merriweather text-center'>Live Matches</p>
				</div>
				<div className='grow overflow-hidden w-[90%] mx-auto flow-root overflow-y-scroll scrollbar-hide pb-2'>
					{data && (
	          <>
							<ul role="list" className="divide-y divide-gray-500 dark:divide-slate-300 bg-white/[55%] rounded-lg">
		            <li className="flex h-[40px] w-full" key="TopList">
			            <div className="w-[30%] my-auto text-center"><p>Left Player</p></div>
			            <div className="w-[20%] my-auto text-center"><p>VS</p></div>
			            <div className="w-[30%] my-auto text-center"><p>Right Player</p></div>
			            <div className="w-[20%] my-auto text-center"></div>
		            </li>
		            {data.matchHistory.map((currentMatch) =>
		            {
		              return (
		                <li className="flex py-4" key={currentMatch.updatedAt + currentMatch.winner}>
		                    <div className="flex w-[30%] my-auto items-center ml-2">
		                        <div className="h-[32px] w-[32px] shrink-0 sm:table-cell">
		                            <img className={`h-full w-full border-2 border-blue-700 rounded-full`} src={currentMatch.leftPhoto} alt=""/>
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
		                            <img className={`h-full w-full border-2 border-blue-700 rounded-full`} src={currentMatch.rightPhoto} alt=""/>
		                        </div>
		                    </div>
												<div className="flex h-full w-[20%] m-auto justify-center">
		                       <button className='bg-pink-500 text-white font-Merriweather rounded-md font-medium px-2 py-1'>Watch</button>
		                    </div>
		                </li>
		            	);
		            })}
		          </ul>
						</>
					)}
				</div>
			</div>
		</div>
  )
}
