import React from 'react'

interface DrawProps {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>
  mouse: {
    y: number
  }
}

const ball = {
  x: 0,
  y: 0,
  vX: 0.0,
  vY: 0.0,
  radius: 0,
  dirX: 0.0,
  dirY: 0.0,
  speed: 0.0
}

const user = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  score: 0
}

const com = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  score: 0
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
  const { canvas, mouse } = props

  getCanvasSize(props)

  canvasSize.height = canvas.current!.height
  canvasSize.width = canvas.current!.width

  ball.vX = 0.5
  ball.vY = 0.5
  ball.x = canvasSize.width / 2
  ball.y = canvasSize.height / 2
  user.width = Math.floor(canvasSize.width / 100)
  com.width = Math.floor(canvasSize.width / 100)
  user.height = Math.floor(canvasSize.height / 6)
  com.height = Math.floor(canvasSize.height / 6)
  user.y = (canvasSize.height - user.height) / 2
  com.y = (canvasSize.height - com.height) / 2
  com.x = canvasSize.width - com.width
  ball.radius = canvasSize.width / 100

  ball.speed = 1

  ball.dirX = -1.0
  ball.dirY = 0.0

  mouse.y = user.y
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
    ball.x = canvasSize.width * ball.vX
    ball.y = canvasSize.height * ball.vY
    user.width = Math.floor(canvasSize.width / 100)
    com.width = Math.floor(canvasSize.width / 100)
    user.height = Math.floor(canvasSize.height / 6)
    com.height = Math.floor(canvasSize.height / 6)
    com.x = canvasSize.width - com.width
    ball.radius = canvasSize.width / 100
  }

  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

  ctx.fillStyle = '#FFF'

  if (canvasSize.width === 300) {
    ctx.font = '50px font'
    ctx.fillText(
      user.score.toString(),
      canvasSize.width / 4 - 10,
      canvasSize.height / 5
    )
    ctx.fillText(
      com.score.toString(),
      (3 * canvasSize.width) / 4 - 10,
      canvasSize.height / 5
    )
  } else {
    ctx.font = '75px font'
    ctx.fillText(
      user.score.toString(),
      canvasSize.width / 4 - 15,
      canvasSize.height / 5
    )
    ctx.fillText(
      com.score.toString(),
      (3 * canvasSize.width) / 4 - 15,
      canvasSize.height / 5
    )
  }

  for (let i = 0; i <= canvasSize.height; i += 15)
    ctx.fillRect((canvasSize.width - 2) / 2, i, 2, 10)

  ctx.fillRect(user.x, user.y, user.width, user.height)
  ctx.fillRect(com.x, com.y, com.width, com.height)

  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true)
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

  playerWon = user.score >= 5 ? 'Player 1 won!' : 'Player 2 won!'

  ctx.fillStyle = '#FFF'

  if (canvasSize.width === 300) {
    ctx.font = '50px font'
    ctx.fillText(
      playerWon,
      (canvasSize.width - 280) / 2,
      canvasSize.height / 2 + 20
    )
    ctx.fillText(
      user.score.toString(),
      canvasSize.width / 4 - 10,
      canvasSize.height / 5
    )
    ctx.fillText(
      com.score.toString(),
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
      user.score.toString(),
      canvasSize.width / 4 - 15,
      canvasSize.height / 5
    )
    ctx.fillText(
      com.score.toString(),
      (3 * canvasSize.width) / 4 - 15,
      canvasSize.height / 5
    )
  }
}

export const update = (props: DrawProps, { gameover }) => {
  const { canvas, mouse } = props

  user.y = mouse.y
  com.y += (ball.y - (com.y + com.height / 2)) * 0.1

  const canvasWidth = canvas.current!.width
  const canvasHeight = canvas.current!.height

  ball.vX += (ball.dirX * ball.speed) / 1000
  ball.vY += (ball.dirY * ball.speed) / 1000

  ball.x = canvasSize.width * ball.vX
  ball.y = canvasSize.height * ball.vY

  if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvasHeight) {
    ball.dirY = -ball.dirY
  }

  let player = ball.x < canvasWidth / 2 ? user : com

  let bTop, bBottom, bLeft, bRight
  let pTop, pBottom, pLeft, pRight

  bTop = ball.y - ball.radius
  bBottom = ball.y + ball.radius
  bLeft = ball.x - ball.radius
  bRight = ball.x + ball.radius

  pTop = player.y
  pBottom = player.y + player.height
  pLeft = player.x
  pRight = player.x + player.width

  if (pLeft < bRight && pTop < bBottom && pRight > bLeft && pBottom > bTop) {
    let collidePoint = ball.y - (player.y + player.height / 2)
    collidePoint = collidePoint / (player.height / 2)

    let angleRad = (Math.PI / 4) * collidePoint

    let direction = ball.x < canvasWidth / 2 ? 1 : -1

    ball.dirX = direction * Math.cos(angleRad)
    ball.dirY = Math.sin(angleRad)

    ball.speed += 0.2
  } else if (ball.x < ball.radius || ball.x + ball.radius > canvasWidth) {
    if (ball.x < ball.radius) com.score++
    else user.score++
    ball.vX = 0.5
    ball.vY = 0.5
    ball.speed = 1
    ball.dirX = ball.dirY < 0 ? 1.0 : -1.0
    ball.dirY = 0.0
  }

  if (user.score >= 5 || com.score >= 5) gameover.current = true
}
