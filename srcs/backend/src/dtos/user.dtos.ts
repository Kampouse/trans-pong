export class UserDto {
  userID: string;
  login42: string;
  username: string;
  userStatus: UserStatus;
  imagePath: string;
  authenticator: boolean;
  friends?: UserDto[];
  blocked?: UserDto[];
}

export enum UserStatus {
  online = 0,
  offline = 1,
  playing = 2,
}
