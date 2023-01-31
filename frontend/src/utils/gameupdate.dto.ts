export class SinglePlayerDto
{
    constructor(
        public player: string,
        public photo: string,
    ){};
}

export class BallDto
{
		constructor(
				public ballPosX: number,
				public ballPosY: number,
				public ballRadius: number,
				public ballSpeed: number,
				public ballDirX: number,
				public ballDirY: number
		){};
}

export class GamePlayerDto
{
		constructor(
				public playerUser: string,
				public playerPhoto: string,
				public playerScore: number,
				public playerPos: number,
		){};
}

export class UpdateGameDto
{
    constructor(
			  public leftPlayer: GamePlayerDto,
				public rightPlayer: GamePlayerDto,
				public gameBall: BallDto,
				public gameOver: boolean, // default false
				public winner: string
    ){};
}
