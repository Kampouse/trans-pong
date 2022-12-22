import React from 'react'

interface DrawProps {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>
  // mouse: {
  //   y: number
  // }
}

interface UpdateProps {
	keyActions: {
		up: boolean,
		down: boolean
	}
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
	playerUser: '',
	playerPhoto: '',
	playerScore: 0,
	playerPos: 0
}

const rightPlayer = {
  playerUser: '',
	playerPhoto: '',
	playerScore: 0,
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

  // mouse.y = leftPlayer.playerPos
}

export function draw(props: DrawProps) {
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

  ctx.fillStyle = 'red'
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

  ctx.fillRect(0, (leftPlayer.playerPos - 0.075) * canvasSize.height, paddleWidth, paddleHeight)
  ctx.fillRect(canvasSize.width - paddleWidth, (rightPlayer.playerPos - 0.075) * canvasSize.height, paddleWidth, paddleHeight)

  ctx.beginPath()
  ctx.arc(canvasSize.width * gameBall.ballPosX, canvasSize.height * gameBall.ballPosY, canvasSize.width * gameBall.ballRadius, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
}

export function drawGameover(props: DrawProps) {
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

  let playerWon: string

  playerWon = leftPlayer.playerScore >= 5 ? 'Player 1 won!' : 'Player 2 won!'

  ctx.fillStyle = '#FFF'

  if (canvasSize.width === 300) {
    ctx.font = '50px font'
    ctx.fillText(
      playerWon,
      (canvasSize.width - 280) / 2,
      canvasSize.height / 2 + 20
    )
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
      playerWon,
      (canvasSize.width - 415) / 2,
      canvasSize.height / 2 + 20
    )
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
}

export const update = ({ keyActions }: UpdateProps) => {
	const playerHeight = 0.15
	const playerWidth = 0.01

	if (leftPlayer.playerPos > 0 && keyActions.up)
  	leftPlayer.playerPos -= 0.01
	if (leftPlayer.playerPos < 1 && keyActions.down)
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
    if (gameBall.ballPosX > 0.5) leftPlayer.playerScore++
    else rightPlayer.playerScore++
    gameBall.ballPosX = 0.5
    gameBall.ballPosY = 0.5
    gameBall.ballSpeed = 10.0
    gameBall.ballDirX = gameBall.ballDirY < 0 ? 1.0 : -1.0
    gameBall.ballDirY = 0.0
  }
}
