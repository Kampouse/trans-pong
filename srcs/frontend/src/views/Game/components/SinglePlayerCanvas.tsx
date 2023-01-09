import { defaultMaxListeners } from 'events'
import React, { useEffect, useRef, useState } from 'react'
import { init, draw, update, drawGameover, singlePlayerDraw } from './ReactiveDraw'
import {usersocket} from '../Matchmaking'
import {UpdateGameDto} from '../../../../../backend/src/dtos/gameUpdate.dtos'


const SinglePlayerCanvas = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const div = useRef<HTMLDivElement | null>(null)

  const [countdown, setCountdown] = useState(true)
  const gameover = useRef(false)

  const player1 = 'Player1'
  const player2 = 'Player2'

  const player1_img =
    'https://flowbite.com/docs/images/people/profile-picture-1.jpg'
  const player2_img =
    'https://flowbite.com/docs/images/people/profile-picture-1.jpg'

  const mouse = {
    y: 0
  }

  useEffect(() => {
    init({ canvas })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameover.current) {
        drawGameover({ canvas })
      }
      if (!gameover.current) {
        update({ gameover })
        singlePlayerDraw({ canvas })
      }
    }, (1 / 60) * 1000)
    usersocket.on("gameUpdate", (gameData: UpdateGameDto) => {
      if(gameData.gameOver){
        drawGameover({canvas});
      }
      if(!gameData.gameOver){
        //update({gameover: gameData.gameOver});
        singlePlayerDraw({canvas});
      }
    })
    //return () => clearInterval(interval)
  }, [countdown])

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
          onMouseMove={(evt) => {
            mouse.y =
              evt.clientY -
              canvas.current!.getBoundingClientRect().top
          }}
          className="m-auto"
        />
        {/* { countdown && <div id="overlay" className="text-6xl text-red-400"><h1>Ready?</h1><CountdownTimer seconds={3}/></div>} */}
      </div>
      <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w-[600px] w-[300px] pt-24 grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-6 grid-cols-4 items-center justify-center mx-auto">
        <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold mr-[10px] justify-end grid xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2">
          {player1}
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
            src={player1_img}
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
            src="/robot.png"
            alt=""
          />
        </div>
        <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold ml-[10px] grid justify-start xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2">
          Computer
        </p>
      </div>
    </div>
  )
}

export default ReactiveCanvas

