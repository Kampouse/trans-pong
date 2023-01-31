import React from 'react'
import {UpdateGameDto} from '../../../../../backend/src/dtos/gameUpdate.dtos'
import { GeneralSnackbar } from 'views/Snackbar/Snackbar'
import { useBallColor, useBackgroundColor, usePaddleColor } from 'Router/Router'
import { useAtom } from 'jotai'
import { usersocket } from '../Matchmaking'

interface DrawProps {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>
}

interface UpdateProps {
	gameover: React.MutableRefObject<boolean>,
	keyActions: {
		up: boolean,
		down: boolean
	}
}

interface ColorProps {
	ballColor: string,
	backgroundColor: string,
	paddleColor: string
}

const gameBall = {
  ballPosX: 0.0,
  ballPosY: 0.0,
  ballRadius: 0,
  ballDirX: 0.0,
  ballDirY: 0.0,
  ballSpeed: 0.0
}

const leftPlayer = {
	playerScore: 0,
	prevPlayerScore: 0,
	playerPos: 0
}

const rightPlayer = {
	playerScore: 0,
	prevPlayerScore: 0,
	playerPos: 0
}

const canvasSize = {
  height: 0,
  width: 0
}

function getCanvasSize(props: DrawProps) {
  const { canvas } = props

  let width = parseInt(
    window.getComputedStyle(canvas!.current!.parentElement!).width
  )
  let height = parseInt(
    window.getComputedStyle(canvas!.current!.parentElement!).height
  )

  canvas.current!.setAttribute('width', width.toString())
  canvas.current!.setAttribute('height', height.toString())
}

export function init(props: DrawProps) {
  const { canvas } = props

  getCanvasSize(props)

  canvasSize.height = canvas.current!.height
  canvasSize.width = canvas.current!.width

  gameBall.ballPosX = 0.5
  gameBall.ballPosY = 0.5
	leftPlayer.playerPos = 0.5
	rightPlayer.playerPos = 0.5
  gameBall.ballRadius = 0.01

  gameBall.ballSpeed = 10.0

  gameBall.ballDirX = -1.0
  gameBall.ballDirY = 0.0
}

export function singlePlayerDraw(props: DrawProps, colors: ColorProps){
	const { canvas } = props
  var ctx = canvas!.current!.getContext('2d')

  if (!ctx) {
    return
  }

  getCanvasSize(props)

  if (
    canvas.current!.height !== canvasSize.height ||
    canvas.current!.width !== canvasSize.width
  ) {
    canvasSize.height = canvas.current!.height
    canvasSize.width = canvas.current!.width
    gameBall.ballRadius = canvasSize.width * 0.01
  }

	const paddleWidth =  Math.floor(canvasSize.width * 0.01)
	const paddleHeight =  Math.floor(canvasSize.height * 0.15)

  ctx.fillStyle = colors.backgroundColor
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

  ctx.fillStyle = '#FFF'

  if (canvasSize.width === 300) {
    ctx.font = '50px font'
    ctx.fillText(
      leftPlayer.playerScore.toString(),
      canvasSize.width / 4 - 10,
      canvasSize.height / 5
    )
    ctx.fillText(
      rightPlayer.playerScore.toString(),
      (3 * canvasSize.width) / 4 - 10,
      canvasSize.height / 5
    )
  } else {
    ctx.font = '75px font'
    ctx.fillText(
      leftPlayer.playerScore.toString(),
      canvasSize.width / 4 - 15,
      canvasSize.height / 5
    )
    ctx.fillText(
      rightPlayer.playerScore.toString(),
      (3 * canvasSize.width) / 4 - 15,
      canvasSize.height / 5
    )
  }

  for (let i = 0; i <= canvasSize.height; i += 15)
    ctx.fillRect((canvasSize.width - 2) / 2, i, 2, 10)

	ctx.fillStyle = colors.paddleColor
  ctx.fillRect(0, (leftPlayer.playerPos - 0.075) * canvasSize.height, paddleWidth, paddleHeight)
  ctx.fillRect(canvasSize.width - paddleWidth, (rightPlayer.playerPos - 0.075) * canvasSize.height, paddleWidth, paddleHeight)

	ctx.fillStyle = colors.ballColor
  ctx.beginPath()
  ctx.arc(canvasSize.width * gameBall.ballPosX, canvasSize.height * gameBall.ballPosY, canvasSize.width * gameBall.ballRadius, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
}

export function draw(props: DrawProps, gameData: UpdateGameDto, colors: ColorProps) {
	const { canvas } = props
  var ctx;
  
 try {
	ctx = canvas!.current!.getContext('2d');
 }
 catch {
	usersocket.disconnect();
 }

  if (!ctx) {
    return
  }

  getCanvasSize(props)

  if (
    canvas.current!.height !== canvasSize.height ||
    canvas.current!.width !== canvasSize.width
  ) {
    canvasSize.height = canvas.current!.height
    canvasSize.width = canvas.current!.width
    gameData.gameBall.ballRadius = canvasSize.width * 0.01
  }

	const paddleWidth =  Math.floor(canvasSize.width * 0.01)
	const paddleHeight =  Math.floor(canvasSize.height * 0.15)

  ctx.fillStyle = colors.backgroundColor
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

  ctx.fillStyle = '#FFF'

  if (canvasSize.width === 300) {
    ctx.font = '50px font'
    ctx.fillText(
      gameData.leftPlayer.playerScore.toString(),
      canvasSize.width / 4 - 10,
      canvasSize.height / 5
    )
    ctx.fillText(
      gameData.rightPlayer.playerScore.toString(),
      (3 * canvasSize.width) / 4 - 10,
      canvasSize.height / 5
    )
  } else {
    ctx.font = '75px font'
    ctx.fillText(
      gameData.leftPlayer.playerScore.toString(),
      canvasSize.width / 4 - 15,
      canvasSize.height / 5
    )
    ctx.fillText(
      gameData.rightPlayer.playerScore.toString(),
      (3 * canvasSize.width) / 4 - 15,
      canvasSize.height / 5
    )
  }

  for (let i = 0; i <= canvasSize.height; i += 15)
    ctx.fillRect((canvasSize.width - 2) / 2, i, 2, 10)

	ctx.fillStyle = colors.paddleColor
  ctx.fillRect(0, (gameData.leftPlayer.playerPos - 0.075) * canvasSize.height, paddleWidth, paddleHeight)
  ctx.fillRect(canvasSize.width - paddleWidth, (gameData.rightPlayer.playerPos - 0.075) * canvasSize.height, paddleWidth, paddleHeight)

	ctx.fillStyle = colors.ballColor
  ctx.beginPath()
  ctx.arc(canvasSize.width * gameData.gameBall.ballPosX, canvasSize.height * gameData.gameBall.ballPosY, canvasSize.width * gameData.gameBall.ballRadius, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
}

function drawGameover(props: DrawProps, leftScore: number, rightScore: number) {
	const { canvas } = props
  var ctx = canvas!.current!.getContext('2d')

  if (!ctx) {
    return
  }

  getCanvasSize(props)

  canvasSize.height = canvas.current!.height
  canvasSize.width = canvas.current!.width

  ctx.fillStyle = '#6e6767'
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

	ctx.fillStyle = '#FFF'

  if (canvasSize.width === 300) {
    ctx.font = '50px font'
    ctx.fillText(
      "Game Over!",
      (canvasSize.width - 280) / 2,
      canvasSize.height / 2 + 20
    )
    ctx.fillText(
      leftScore.toString(),
      canvasSize.width / 4 - 10,
      canvasSize.height / 5
    )
    ctx.fillText(
      rightScore.toString(),
      (3 * canvasSize.width) / 4 - 10,
      canvasSize.height / 5
    )
  } else {
    ctx.font = '75px font'
    ctx.fillText(
      "Game Over!",
      (canvasSize.width - 415) / 2,
      canvasSize.height / 2 + 20
    )
    ctx.fillText(
      leftScore.toString(),
      canvasSize.width / 4 - 15,
      canvasSize.height / 5
    )
    ctx.fillText(
      rightScore.toString(),
      (3 * canvasSize.width) / 4 - 15,
      canvasSize.height / 5
    )
  }
}

export function drawSingleGameover(props: DrawProps, winner: React.MutableRefObject<string>) {
  winner.current = leftPlayer.playerScore >= 5 ? "You" : "Computer"
  drawGameover(props, leftPlayer.prevPlayerScore, rightPlayer.prevPlayerScore);
}

export function drawMultiGameover(props: DrawProps, gameData: UpdateGameDto, winner: React.MutableRefObject<string>) {
  winner.current = gameData.leftPlayer.playerScore >= 5 ? gameData.leftPlayer.playerUser : gameData.rightPlayer.playerUser
  drawGameover(props, gameData.leftPlayer.playerScore, gameData.rightPlayer.playerScore)
}

export const update = (props: UpdateProps) => {
	const playerHeight = 0.15
	const playerWidth = 0.01

  if (leftPlayer.playerPos > 0 && props.keyActions.up)
		leftPlayer.playerPos -= 0.01
	if (leftPlayer.playerPos < 1 && props.keyActions.down)
		leftPlayer.playerPos += 0.01

  rightPlayer.playerPos += (gameBall.ballPosY - rightPlayer.playerPos) * 0.1

  gameBall.ballPosX += (gameBall.ballDirX * gameBall.ballSpeed) / 1000
  gameBall.ballPosY += (gameBall.ballDirY * gameBall.ballSpeed) / 1000

  if (gameBall.ballPosY <= 0.01 || gameBall.ballPosY >= 0.99) {
    gameBall.ballDirY = -gameBall.ballDirY
  }

  let player = gameBall.ballPosX < 0.5 ? leftPlayer : rightPlayer

  let bTop, bBottom, bLeft, bRight
  let pTop, pBottom, pLeft, pRight

  bTop = gameBall.ballPosY - (gameBall.ballRadius / 3 * 2)
  bBottom = gameBall.ballPosY + (gameBall.ballRadius / 3 * 2)
  bLeft = gameBall.ballPosX - gameBall.ballRadius
  bRight = gameBall.ballPosX + gameBall.ballRadius

  pTop = player.playerPos - (playerHeight / 2)
  pBottom = player.playerPos + (playerHeight / 2)
  pLeft = (player === leftPlayer) ? 0 : 1 - playerWidth
  pRight = (player === leftPlayer) ? playerWidth : 1

  if (pLeft < bRight && pTop < bBottom && pRight > bLeft && pBottom > bTop) {
		let collidePoint = gameBall.ballPosY - player.playerPos
    collidePoint = collidePoint / (playerHeight / 2)

    let angleRad = (Math.PI / 4) * collidePoint

    let direction = gameBall.ballPosX < 0.5 ? 1 : -1

    gameBall.ballDirX = direction * Math.cos(angleRad)
    gameBall.ballDirY = Math.sin(angleRad)
	} else if (gameBall.ballPosX <= gameBall.ballRadius || gameBall.ballPosX + gameBall.ballRadius >= 1) {
    if (gameBall.ballPosX > 0.5){
      leftPlayer.playerScore++
    }
    else{
      rightPlayer.playerScore++
    }
		if (leftPlayer.playerScore >= 5 || rightPlayer.playerScore >= 5) {
			props.gameover.current = true;
			leftPlayer.prevPlayerScore = leftPlayer.playerScore; 
			rightPlayer.prevPlayerScore = rightPlayer.playerScore; 
			leftPlayer.playerScore = 0;
			rightPlayer.playerScore = 0;
		}
    gameBall.ballPosX = 0.5
    gameBall.ballPosY = 0.5
    gameBall.ballSpeed = 10.0
    gameBall.ballDirX = gameBall.ballDirY < 0 ? 1.0 : -1.0
    gameBall.ballDirY = 0.0
  }
}
