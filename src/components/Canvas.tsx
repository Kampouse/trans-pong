import { defaultMaxListeners } from "events";
import React, { Component, useEffect, useRef, useState } from "react";
import { init, draw, update, drawGameover } from "./draw";

function parentWidth(elem: HTMLElement | null) {
	return elem!.clientWidth;
}

function parentHeight(elem: HTMLElement | null) {
	return elem!.clientWidth;
}

const Canvas = () => {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const div = useRef<HTMLDivElement | null>(null);

	const [countdown, setCountdown] = useState(true);
	const gameover = useRef(false);

	let canvasHeight = 0;
	let canvasWidth = 0;
	if (document.getElementById('container')) {
		canvasHeight = parentWidth(document.getElementById('container'));
		canvasWidth = parentHeight(document.getElementById('container'));
	}
		
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
		}, 10);
		return () => clearInterval(interval);
	}, [countdown]);

	return (
		<>
			<div id="container" ref={div} className="w-5/6 h-3/5 pt-[75px] m-auto">
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
 