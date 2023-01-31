
export interface UserDto {
    userID: string;
    login42: string;
    username: string;
    userStatus: UserStatus;
    imagePath: string;
    authenticator: boolean;
    friends?: UserDto[];
    blocked?: UserDto[];
}

export enum UserStatus{
    online = 0,
    offline = 1,
    playing = 2,
}

export interface FriendDto {

         friendUser:         string,
         friendPhoto:        string,
         friendStatus:       string

}

export interface BlockDto {
         id:                 number,
         friendUser:         string,
         friendPhoto:        string,
         key:                string

}

export interface FriendRequestDto{
  
         fromUser:           string,
         fromPhoto:          string
    
}

export interface MatchDto{
   
         leftPlayer:         string,
         leftPhoto:          string,
         leftScore:          number,
         rightPlayer:        string,
         rightPhoto:         string,
         rightScore:         number,
         winner:             string,
         updatedAt:          Date
  
}

export interface StatisticsDto{

         played:              number,
         win:                 number,
         winRatio:            number,
         rightPlayed:         number,
         rightWin:            number,
         rightWinRatio:       number,
         leftPlayed:          number,
         leftWin:             number,
         leftWinRatio:        number,
    
}

export interface PrivateProfileDto {
         id: number,
         error: boolean,
         username: string,
         status: string,
         imagePath: string,
         friendList: FriendDto[],
         friendRequests: FriendRequestDto[],
         matchHistory: MatchDto[],
         stats: StatisticsDto,
         authenticator: boolean,
         blockList: BlockDto[],
         requestFrom: string
}