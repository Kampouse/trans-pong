export class Friend {
    constructor (
        public friendUser:         string,
        public friendPhoto:        string,
        public friendStatus:       string
    ){}
}

export class FriendRequest{
    constructor(
        public fromUser:           string,
        public fromPhoto:          string
    ){}
}

export class Match{
    constructor(
        public matchNum:           number,
        public leftPlayer:         string,
        public leftPhoto:          string,
        public leftScore:          number,
        public rightPlayer:        string,
        public rightPhoto:         string,
        public rightScore:         number,
        public winner:             string,
    ){}
}

export class Achievement{
    constructor(
        public title:              string,
    ){}
}

export class Statistics{
    constructor(
        public played:              number,
        public win:                 number,
        public winRatio:            number,
        public rightPlayed:         number,
        public rightWin:            number,
        public rightWinRatio:       number,
        public leftPlayed:          number,
        public leftWin:             number,
        public letfWinRatio:        number,
    ){}
}

export class ProfileResponse {
    constructor(
        public error: boolean,
        public clientProfile: boolean,
        public username: string,
        public status: string,
        public imagePath: string,
        public friendList: Friend[],
        public friendRequets: FriendRequest[],
        public matchHistory: Match[],
        public achievement: Achievement[],
        public stats: Statistics,
        public authentificator: boolean){}
}
