import { defaultMaxListeners } from "events";
import React, { Component, useEffect, useRef, useState } from "react";
import { init, draw, update } from "./draw";

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
		console.log(document.getElementById('container')?.clientHeight);
		console.log(document.getElementById('container')?.clientWidth);
		const interval = setInterval(() => {
			update({ canvas, mouse });
			draw({ canvas, mouse });
		}, 10);
		return () => clearInterval(interval);
	}, [countdown]);

	return (
		<div id="container" ref={div} className="w-4/5 h-5/6">			
			<canvas
					id="myCanvas"
					ref={canvas}
					style={{border: "1px solid #000"}}
					onMouseMove={(evt) => {mouse.y = evt.clientY - canvas.current!.getBoundingClientRect().top - 50}}
				/>
			{/* { countdown && <div id="overlay" className="text-6xl text-red-400"><h1>Ready?</h1><CountdownTimer seconds={3}/></div>} */}
		</div>
	);
}

export default Canvas;
 