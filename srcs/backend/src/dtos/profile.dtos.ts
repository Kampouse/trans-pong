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

export class FriendRequestDto{
    constructor(
        public fromUser:           string,
        public fromPhoto:          string
    ){}
}

export class MatchDto{
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

export class AchievementDto{
    constructor(
        public title:              string,
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
        public letfWinRatio:        number,
    ){}
}

export class ProfileResponseDto {
    constructor(
        public error: boolean,
        public username: string,
        public status: string,
        public imagePath: string,
        public friendList: FriendDto[],
        public friendRequests: FriendRequestDto[],
        public matchHistory: MatchDto[],
        public achievement: AchievementDto[],
        public stats: StatisticsDto,
        public authentificator: boolean){}
}

export class ProfileResponsePublic {
    constructor(
        public error: boolean,
        public username: string,
        public status: string,
        public imagePath: string,
        public friendList: FriendDto[],
        public matchHistory: MatchDto[],
        public achievement: AchievementDto[],
        public stats: StatisticsDto){}
}
