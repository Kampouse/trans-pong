import { defaultMaxListeners } from 'events'
import React, { useEffect, useRef, useState } from 'react'
import { init, draw, update, drawSingleGameover, singlePlayerDraw } from './ReactiveDraw'
import {usersocket} from '../Matchmaking'
import {UpdateGameDto} from '../../../../../backend/src/dtos/gameUpdate.dtos'
import { GeneralSnackbar } from 'views/Snackbar/Snackbar'
import { useBallColor, useBackgroundColor, usePaddleColor } from 'Router/Router'
import { useAtom } from 'jotai'

let keyActions = {
	up: false,
	down: false
}

const useFetch = () =>
{
	const [gameReq, setGameReq] = useState<any>(null);
	
	useEffect(() => {
		fetch('http://localhost:3000/profile/play/solo' , {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true'
			}
		})
      .then((response) => response.json())
			.then((data) => {
				setGameReq(data);
				console.log(data);
			})
	}, [])
	return {gameReq};
}


const SinglePlayerCanvas = () => {
	const canvas = useRef<HTMLCanvasElement | null>(null)
  const div = useRef<HTMLDivElement | null>(null)

	const [ballColor, setBallColor] = useAtom(useBallColor)
	const [backgroundColor, setBackgroundColor] = useAtom(useBackgroundColor)
	const [paddleColor, setPaddleColor] = useAtom(usePaddleColor)
	
  const [countdown, setCountdown] = useState(true)
  const gameover = useRef(false)

	const winner = useRef('')
	const snackbarMsg = useRef('')
	const [openSnackbar, setOpenSnackbar] = useState(false)

	const {gameReq: data} = useFetch();

  useEffect(() => {
    init({ canvas })
		keyActions.up = false
		keyActions.down = false
  }, [gameover.current])

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameover.current) {
        drawSingleGameover({ canvas }, winner)
      }
      if (!gameover.current) {
        update({ gameover, keyActions })
        singlePlayerDraw({ canvas }, {ballColor, backgroundColor, paddleColor})
      }
    }, (1 / 60) * 1000)

		return () => clearInterval(interval)    
  }, [])

	const handleKeyDown = event => {
		event.preventDefault();
		if (event.key === 'w' || event.key === 'ArrowUp')
			keyActions.up = true;
		if (event.key === 's' || event.key === 'ArrowDown')
			keyActions.down = true;
    console.log('User pressed: ', event.key);
  };

	const handleKeyUp = event => {
		event.preventDefault();
		if (event.key === 'w' || event.key === 'ArrowUp')
			keyActions.up = false;
		if (event.key === 's' || event.key === 'ArrowDown')
			keyActions.down = false;
    console.log('User released: ', event.key);
  };

  return (
    <div
			className="mx-auto w-full h-full pt-[50px]"
			tabIndex={0}
			onKeyDownCapture={handleKeyDown}
			onKeyUpCapture={handleKeyUp}
		>
      <div
        id="container"
        ref={div}
        className="xl:w-[1200px] xl:h-[800px] lg:w-[900px] lg:h-[600px] md:w-[600px] md:h-[400px] sm:w-[600px] sm:h-[400px] w-[300px] h-[200px] pt-[50px] mx-auto"
			>
        <canvas
          id="canvas"
          ref={canvas}
          style={{ border: '1px solid #000' }}
          className="m-auto"
        />
        {/* { countdown && <div id="overlay" className="text-6xl text-red-400"><h1>Ready?</h1><CountdownTimer seconds={3}/></div>} */}
      </div>
      <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w-[600px] w-[300px] pt-24 grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-6 grid-cols-4 items-center justify-center mx-auto">
        {data &&
					<p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold mr-[10px] justify-end grid xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2">
						{data.login}
	        </p>
				}
        <div
				className="rounded-full bg-white grid justify-center m-auto
				xl:h-[125px] xl:w-[125px]
				lg:h-[100px] lg:w-[100px]
				md:h-[75px] md:w-[75px]
				sm:h-[75px] sm:w-[75px]
				h-[50px] w-[50px]
				bg-blue-500 border-4 border-white"
        >
					{data &&
	          <img
	            className="h-full w-full rounded-full"
	            src={data.photo}
	            alt=""
						/>
					}
        </div>
        <div
          className="rounded-full bg-white grid justify-center m-auto
												xl:h-[125px] xl:w-[125px]
												lg:h-[100px] lg:w-[100px]
												md:h-[75px] md:w-[75px]
												sm:h-[75px] sm:w-[75px]
												h-[50px] w-[50px]
												bg-blue-500 border-4 border-white"
        >
          <img
            className="h-full w-full rounded-full"
            src={Robot}
            alt=""
          />
        </div>
        <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold ml-[10px] grid justify-start xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2">
          Computer
        </p>
      </div>
			<GeneralSnackbar
				message={snackbarMsg.current}
        open={openSnackbar}
        severity={'info'}
        onClose={() => setOpenSnackbar(false)}
			/>
    </div>
  )
}

export default SinglePlayerCanvas

