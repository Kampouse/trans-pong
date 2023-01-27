export class Game
{
    constructor(
        public leftPlayer:          string,
        public leftPlayerPhoto:     string,
        public rightPlayer:         string,
        public rightPlayerPhoto:    string,
        public gameID:              string 
    ){}
}

export class Relation
{
    constructor(
        public error:   boolean,
        public friend:  boolean,
        public block:   boolean
    ){}
}

export class ActiveGameDto
{
    constructor(
        public games:   Game[]
    ){}
}

export class UpdateUsernameDto
{
    constructor(
        public newUsername: string,
    ){};
}

export class FriendDto {
    constructor (
        public friendUser:         string,
        public friendPhoto:        string,
        public friendStatus:       string
    ){}
}

export class BlockDto {
    constructor (
        public friendUser:         string,
        public friendPhoto:        string,
        public key:                string
    ){}
}

export class FriendRequestDto{
    constructor(
        public fromUser:           string,
        public fromPhoto:          string
    ){}
}

export class MatchDto{
    constructor(
        public leftPlayer:         string,
        public leftPhoto:          string,
        public leftScore:          number,
        public rightPlayer:        string,
        public rightPhoto:         string,
        public rightScore:         number,
        public winner:             string,
        public updatedAt:          Date
    ){}
}

export class StatisticsDto{
    constructor(
        public played:              number,
        public win:                 number,
        public winRatio:            number,
        public rightPlayed:         number,
        public rightWin:            number,
        public rightWinRatio:       number,
        public leftPlayed:          number,
        public leftWin:             number,
        public leftWinRatio:        number,
    ){}
}

export class PrivateProfileDto {
    constructor(
        public error: boolean,
        public username: string,
        public status: string,
        public imagePath: string,
        public friendList: FriendDto[],
        public friendRequests: FriendRequestDto[],
        public matchHistory: MatchDto[],
        public stats: StatisticsDto,
        public authenticator: boolean,
        public blockList: BlockDto[]){}
}

export class PublicProfileDto {
    constructor(
        public error: boolean,
        public username: string,
        public status: string,
        public imagePath: string,
        public friendList: FriendDto[],
        public matchHistory: MatchDto[],
        public stats: StatisticsDto,
        public requestFrom: string){}
}
