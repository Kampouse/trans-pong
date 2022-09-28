import React, { useEffect, useRef, useState } from "react";
import { draw, update } from "./draw";

const Canvas = () => {
	const canvas = useRef<HTMLCanvasElement | null>(null);

	const [countdown, setCountdown] = useState(true);

	const canvasHeight = 600;
	const canvasWidth = 900;

	const ball = {
		x : canvasWidth / 2,
		y : canvasHeight / 2,
		radius : 10,
		velocityX : 7,
		velocityY : 0,
		speed : 7,
	}

	const user = {
		x : 0,
		y : (canvasHeight - 100) / 2,
		width : 10,
		height : 100,
		score : 0,
	}

	const com = {
		x : canvasWidth - 10,
		y : (canvasHeight - 100) / 2,
		width : 10,
		height : 100,
		score : 0,
	}

	const net = {
		x : (canvasWidth - 2) / 2,
		y : 0,
		width : 2,
		height : 10,
	}
	
	useEffect(() => {
		const interval = setInterval(() => {
			if (!countdown)
				update({ canvas, ball, net, user, com });
			draw({ canvas, ball, net, user, com });
			console.log(ball.velocityX, ball.velocityY);
		}, 25);
		return () => clearInterval(interval);
	}, [countdown]);

	const [timeLeft, setTimeLeft] = useState(3);
	const CountdownTimer = () => {

		useEffect(() => {
			if (timeLeft == -1) {
				setCountdown(false);
				return ;
			}
			const interval = setInterval(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			return () => clearInterval(interval);
		}, [timeLeft]);
		if (timeLeft)
			return (<h1>{timeLeft}</h1>);
		else
			return (<h1>GO!</h1>)
	}

	const handleMouseMove = (e: any) => {
		if (!countdown) {
			user.y = e.clientY - e.target.offsetTop;
			if (user.y > canvasHeight - user.height/2)
				user.y = canvasHeight - user.height/2;
		}
	}

	return (
		<div id="container" onMouseMove={handleMouseMove} tabIndex={0}>
			<canvas
				ref={canvas}
				style={{border: "1px solid #000"}}
				width={canvasWidth}
				height={canvasHeight}
			/>
			{ countdown && <div id="overlay" className="text-6xl text-red-400"><h1>Ready?</h1><CountdownTimer /></div>}
		</div>
	);
}
 
export default Canvas;