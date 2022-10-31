import { defaultMaxListeners } from "events";
import React, { useEffect, useRef, useState } from "react";
import { init, draw, update, drawGameover } from "./ReactiveDraw";

const ReactiveCanvas = () => {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const div = useRef<HTMLDivElement | null>(null);

	const [countdown, setCountdown] = useState(true);
	const gameover = useRef(false);
		
	const mouse = {
		y : 0,
	}

	useEffect(() => {
		init({ canvas, mouse });
	}, [])
	
	useEffect(() => {
		const interval = setInterval(() => {
			if (gameover.current) {
				drawGameover({ canvas, mouse });
			}
			if (!gameover.current) {
				update({ canvas, mouse }, { gameover });
				draw({ canvas, mouse });
			}
		}, 1);
		return () => clearInterval(interval);
	}, [countdown]);

	return (
		<>
			<div id="container" ref={div} className="xl:w-[1200px] xl:h-[800px] lg:w-[900px] lg:h-[600px] md:w-[600px] md:h-[400px] sm:w-[600px] sm:h-[400px] w-[300px] h-[200px] pt-[75px] m-auto">
				<canvas
						id="myCanvas"
						ref={canvas}
						style={{border: "1px solid #000"}}
						onMouseMove={(evt) => {mouse.y = evt.clientY - canvas.current!.getBoundingClientRect().top - (canvas.current!.height / 16)}}
						className="m-auto"
					/>
				{/* { countdown && <div id="overlay" className="text-6xl text-red-400"><h1>Ready?</h1><CountdownTimer seconds={3}/></div>} */}
			</div>
			<div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w-[600px] w-[300px] pt-24 grid grid-cols-6 items-center justify-center m-auto">
				<p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold mr-[10px] justify-end grid col-span-2">Username</p>
				<div className="rounded-full bg-white grid justify-center m-auto
												xl:h-[125px] xl:w-[125px]
												lg:h-[100px] lg:w-[100px]
												md:h-[75px] md:w-[75px]
												sm:h-[75px] sm:w-[75px]
												h-[50px] w-[50px]
												bg-blue-500 border-4 border-white"></div>
				<div className="rounded-full bg-white grid justify-center m-auto
												xl:h-[125px] xl:w-[125px]
												lg:h-[100px] lg:w-[100px]
												md:h-[75px] md:w-[75px]
												sm:h-[75px] sm:w-[75px]
												h-[50px] w-[50px]
												bg-blue-500 border-4 border-white"></div>
				<p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold ml-[10px] grid justify-start col-span-2">Username</p>
			</div>
		</>
	);
}

// xl:space-x-40 lg:space-x-32 md:space-x-24 sm:space-x-24 space-x-12

export default ReactiveCanvas;
