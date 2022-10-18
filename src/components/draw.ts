import React, { useEffect, useState } from "react"

interface DrawProps {
	canvas: React.MutableRefObject<HTMLCanvasElement | null>;
	mouse : {
		y: number;
	}
}

const ball = {
	x : 0,
	y : 0,
	radius : 10,
	velocityX : 7,
	velocityY : 0,
	speed : 7,
}

const user = {
	x : 0,
	y : 0,
	width : 10,
	height : 100,
	score : 0,
}

const com = {
	x : 0,
	y : 0,
	width : 10,
	height : 100,
	score : 0,
}


export function init(props: DrawProps) {
	const { canvas, mouse } = props;
	canvas.current!.setAttribute("width", window.getComputedStyle(canvas!.current!.parentElement!).width);
	canvas.current!.setAttribute("height", window.getComputedStyle(canvas!.current!.parentElement!).height);
	
	const canvasWidth = canvas.current!.width;
	const canvasHeight = canvas.current!.height;
	
	com.x = canvasWidth - 10;
	com.y = (canvasHeight - 100) / 2;
	user.y = (canvasHeight - 100) / 2;
	ball.x = canvasWidth / 2;
	ball.y = canvasHeight / 2;
	mouse.y = user.y;
}

export function draw (props: DrawProps) {
	const { canvas, mouse } = props;
	var ctx = canvas!.current!.getContext('2d');

	if (!ctx) {
		return ;
	}

	canvas.current!.setAttribute("width", window.getComputedStyle(canvas!.current!.parentElement!).width);
	canvas.current!.setAttribute("height", window.getComputedStyle(canvas!.current!.parentElement!).height);
	
	const canvasWidth = canvas.current!.width;
	const canvasHeight = canvas.current!.height;

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	ctx.fillStyle = "#FFF";
	ctx.font = "75px fantasy";

	ctx.fillText(user.score.toString(), canvasWidth/4, canvasHeight/5);
	ctx.fillText(com.score.toString(), 3*canvasWidth/4, canvasHeight/5);

	for (let i = 0; i <= canvasHeight; i += 15)
		ctx.fillRect((canvasWidth - 2) / 2, i, 2, 10);
	
	ctx.fillRect(user.x, user.y, user.width, user.height);
	ctx.fillRect(com.x, com.y, com.width, com.height);

	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}


export const update = (props: DrawProps) => {
	const { canvas, mouse } = props;

	user.y = mouse.y;

	const canvasWidth = canvas.current!.width;
	const canvasHeight = canvas.current!.height;
	com.x = canvasWidth - 10;

	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	com.y += (ball.y - (com.y + com.height/2)) * 0.1;

	if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvasHeight)
		ball.velocityY = -ball.velocityY;

	let player = (ball.x < canvasWidth/2) ? user : com;

	let bTop, bBottom, bLeft, bRight;
	let pTop, pBottom, pLeft, pRight;

	bTop = ball.y - ball.radius;
	bBottom = ball.y + ball.radius;
	bLeft = ball.x - ball.radius;
	bRight = ball.x + ball.radius;

	pTop = player.y;
	pBottom = player.y + player.height;
	pLeft = player.x;
	pRight = player.x + player.width;

	if (pLeft < bRight && pTop < bBottom && pRight > bLeft && pBottom > bTop) {
		let collidePoint = (ball.y - (player.y + player.height/2));
		collidePoint = collidePoint / (player.height/2);

		let angleRad = Math.PI/4 * collidePoint;

		let direction = (ball.x < canvasWidth/2) ? 1 : -1;

		ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);

		ball.speed += 0.25;
	}
	else if (ball.x < ball.radius || ball.x + ball.radius > canvasWidth) {
		if (ball.x < ball.radius)
			com.score++;
		else
			user.score++;
		ball.x = canvasWidth / 2;
		ball.y = canvasHeight / 2;
		ball.speed = 7;
		ball.velocityY = 0;
		ball.velocityX = (ball.velocityX < 0) ? -7.0 : 7.0;
	}
}
