import { defaultMaxListeners } from "events";
import React, { Component, useEffect, useRef, useState } from "react";
import { init, draw, update, drawGameover } from "./draw";

const Canvas = () => {
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
				update({ canvas, mouse }, {gameover});
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
			{/* <div className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono h-[100px] w-[100px] bg-blue-500">404</div>
			<div className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono h-[100px] w-[100px] bg-blue-500">404</div> */}
		</>
	);
}

export default Canvas;
 