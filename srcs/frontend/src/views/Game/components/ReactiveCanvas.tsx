import { defaultMaxListeners } from 'events'
import React, { useEffect, useRef, useState } from 'react'
import { init, draw, update, drawGameover } from './ReactiveDraw'
import {usersocket} from '../Matchmaking'
import {UpdateGameDto} from '../../../../../backend/src/dtos/gameUpdate.dtos'


const ReactiveCanvas = () => {
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
    init({ canvas, mouse })
  }, [])

  useEffect(() => {
    /*
    const interval = setInterval(() => {
      if (gameover.current) {
        drawGameover({ canvas, mouse })
      }
      if (!gameover.current) {
        update({ gameover })
        draw({ canvas, mouse })
      }
    }, (1 / 60) * 1000)
    */
    usersocket.on("gameUpdate", (gameData: UpdateGameDto) => {
      if(gameData.gameOver){
        drawGameover({canvas, mouse});
      }
      if(!gameData.gameOver){
        //update({gameover: gameData.gameOver});
        draw({canvas, mouse}, gameData);
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
    <div className="m-auto ">
      <div
        id="container"
        ref={div}
        className="xl:w-[1200px] xl:h-[800px] lg:w-[900px] lg:h-[600px] md:w-[600px] md:h-[400px] sm:w-[600px] sm:h-[400px] w-[300px] h-[200px] pt-[50px]"
				tabIndex={0}
				onKeyDownCapture={handleKeyDown}
				onKeyUpCapture={handleKeyUp}
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
      <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w-[600px] w-[300px] pt-24 grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-6 grid-cols-4 items-center justify-center">
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
            src={player2_img}
            alt=""
          />
        </div>
        <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold ml-[10px] grid justify-start xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2">
          {player2}
        </p>
      </div>
      <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w-[600px] w-[300px] h-fit justify-center m-auto pt-2">
        <div className="grid justify-center m-auto">
          <button className="font-carattere bg-pink-500 text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl w-fit text-lg font-bold py-2 px-4 rounded">
            Give Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReactiveCanvas

