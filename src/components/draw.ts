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
	vX: 0.0,
	vY: 0.0,
	radius : 0,
	velocityX : 2.0,
	velocityY : 0.0,
	speed : 2.0,
	defaultSpeed: 2.0,
}

const user = {
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	score : 0,
}

const com = {
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	score : 0,
}

const canvasSize = {
	height : 0,
	width : 0,
}

function getCanvasSize(props: DrawProps) {
	const { canvas } = props;

	let width = (parseInt(window.getComputedStyle(canvas!.current!.parentElement!).width));
	let height = (parseInt(window.getComputedStyle(canvas!.current!.parentElement!).height));

	console.log(width, height);
	if (height < 600) 
		width = height * 1.5;
	else if (width < 900)
		height = width / 1.5;
	console.log(width, height);

	canvas.current!.setAttribute("width", Math.min(width, 900).toString());
	canvas.current!.setAttribute("height", Math.min(height, 600).toString());

	// canvasSize.height = canvas.current!.height;
	// canvasSize.width = canvas.current!.width;
}
// 871, 424
// 871, 580

// 904, 443
// 664, 443

// 895, 437
// 895, 596


export function init(props: DrawProps) {
	const { canvas, mouse } = props;

	getCanvasSize(props);

	// canvas.current!.setAttribute("width", Math.min(parseInt(window.getComputedStyle(canvas!.current!.parentElement!).width), 900).toString());
	// canvas.current!.setAttribute("height", Math.min(parseInt(window.getComputedStyle(canvas!.current!.parentElement!).height), 600).toString());

	canvasSize.height = canvas.current!.height;
	canvasSize.width = canvas.current!.width;
	
	ball.vX = 0.5;
	ball.vY = 0.5;
	ball.x = canvasSize.width / 2;
	ball.y = canvasSize.height / 2;
	user.width = Math.floor(canvasSize.width / 100);
	com.width = Math.floor(canvasSize.width / 100);
	user.height = Math.floor(canvasSize.height / 8);
	com.height = Math.floor(canvasSize.height / 8);
	user.y = (canvasSize.height - user.height) / 2;
	com.y = (canvasSize.height - com.height) / 2;
	com.x = canvasSize.width - com.width;
	ball.radius = Math.min(Math.max(Math.floor((canvasSize.width * canvasSize.width) / 65000), 5), 12);
	ball.velocityX = canvasSize.width / 500;
	ball.defaultSpeed = ball.velocityX;
	ball.speed = ball.defaultSpeed;
	mouse.y = user.y;
}

export function draw (props: DrawProps) {
	const { canvas, mouse } = props;
	var ctx = canvas!.current!.getContext('2d');

	if (!ctx) {
		return ;
	}

	getCanvasSize(props);

	// canvas.current!.setAttribute("width", Math.min(parseInt(window.getComputedStyle(canvas!.current!.parentElement!).width), 900).toString());
	// canvas.current!.setAttribute("height", Math.min(parseInt(window.getComputedStyle(canvas!.current!.parentElement!).height), 600).toString());
	
	if (canvas.current!.height !== canvasSize.height || canvas.current!.width !== canvasSize.width) {
		canvasSize.height = canvas.current!.height;
		canvasSize.width = canvas.current!.width;
		// ball.x = canvasSize.width * ball.vX;
		// ball.y = canvasSize.height * ball.vY;
		user.width = Math.floor(canvasSize.width / 100);
		com.width = Math.floor(canvasSize.width / 100);
		user.height = Math.floor(canvasSize.height / 8);
		com.height = Math.floor(canvasSize.height / 8);
		ball.radius = Math.min(Math.max(Math.floor((canvasSize.width * canvasSize.width) / 65000), 5), 12);
		com.x = canvasSize.width - com.width;
	}

	// console.log(canvasSize.width, canvasSize.height);

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

	ctx.fillStyle = "#FFF";
	ctx.font = "75px fantasy";

	ctx.fillText(user.score.toString(), canvasSize.width/4, canvasSize.height/5);
	ctx.fillText(com.score.toString(), 3*canvasSize.width/4, canvasSize.height/5);

	for (let i = 0; i <= canvasSize.height; i += 15)
		ctx.fillRect((canvasSize.width - 2) / 2, i, 2, 10);
	
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

		ball.speed += ball.defaultSpeed / 10;
	}
	else if (ball.x < ball.radius || ball.x + ball.radius > canvasWidth) {
		if (ball.x < ball.radius)
			com.score++;
		else
			user.score++;
		ball.x = canvasWidth / 2;
		ball.y = canvasHeight / 2;
		ball.speed = ball.defaultSpeed;
		ball.velocityY = 0;
		ball.velocityX = (ball.velocityX < 0) ? -ball.defaultSpeed : ball.defaultSpeed;
	}
}
