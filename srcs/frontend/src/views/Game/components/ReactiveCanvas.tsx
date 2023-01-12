import { defaultMaxListeners } from 'events'
import React, { useEffect, useRef, useState } from 'react'
import { init, draw, drawMultiGameover } from './ReactiveDraw'
import {usersocket} from '../Matchmaking'
import {UpdateGameDto} from '../../../../../backend/src/dtos/gameUpdate.dtos'
import { GeneralSnackbar } from 'views/Snackbar/Snackbar'
import { useBallColor, useBackgroundColor, usePaddleColor } from 'Router/Router'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router'

const ReactiveCanvas = () => {
  const nav = useNavigate();
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const div = useRef<HTMLDivElement | null>(null)

	const [ballColor, setBallColor] = useAtom(useBallColor)
	const [backgroundColor, setBackgroundColor] = useAtom(useBackgroundColor)
	const [paddleColor, setPaddleColor] = useAtom(usePaddleColor)

	const [gameDataGen, setGameDataGen] = useState<any>(null);

  const [countdown, setCountdown] = useState(true)

	const winner = useRef('')
	const snackbarMsg = useRef('')
	const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    usersocket.on("gameUpdate", (gameData: UpdateGameDto) => {
			setGameDataGen(gameData)
      if(gameData.gameOver){
        drawMultiGameover({canvas}, gameData, winner);
				snackbarMsg.current = winner.current + " won!";
				setOpenSnackbar(true);
      }
      if(!gameData.gameOver){
        draw({canvas}, gameData, {ballColor, backgroundColor, paddleColor});
      }
    })
    usersocket.on("leaveRoom", (roomID) => {
      usersocket.off("gameUpdate")
      usersocket.disconnect()
      setTimeout(() => {
        nav('/Profile'); //go back to profile
      }, 3000)
    })
  }, [])

	const handleKeyDown = event => {
    console.log('User pressed: ', event.key);
    if(event.key == "ArrowUp" || event.key == "ArrowDown")
      usersocket.emit("updatePlayerPosition", {direction: event.key}); //need to find a way to emit this only once until a keyup event is fired
  };

  
	const handleKeyUp = event => {
    console.log('User released: ', event.key);
    usersocket.emit("stopUpdatePlayerPosition")
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
          id="myCanvas"
          ref={canvas}
          style={{ border: '1px solid #000' }}
          className="m-auto"
        />
        {/* { countdown && <div id="overlay" className="text-6xl text-red-400"><h1>Ready?</h1><CountdownTimer seconds={3}/></div>} */}
      </div>
      <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w-[600px] w-[300px] pt-24 grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-6 grid-cols-4 items-center justify-center mx-auto">
        {gameDataGen && (
					<>
						<p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold mr-[10px] justify-end grid xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2">
		          {gameDataGen.leftPlayer.playerUser}
		        </p>
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
		            src={gameDataGen.leftPlayer.playerPhoto}
		            alt=""
		          />
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
		            src={gameDataGen.rightPlayer.playerPhoto}
		            alt=""
		          />
		        </div>
		        <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold ml-[10px] grid justify-start xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2">
							{gameDataGen.rightPlayer.playerUser}
		        </p>
					</>
				)}
      </div>
      <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w-[600px] w-[300px] h-fit justify-center m-auto pt-8">
        <div className="grid justify-center m-auto">
          <button className="font-carattere bg-pink-500 text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl w-fit text-lg font-bold py-2 px-4 rounded">
            Give Up
          </button>
        </div>
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

export default ReactiveCanvas

