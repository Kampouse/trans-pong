import { Friends, UserStatus } from '@prisma/client';

export class UserDto {
  userID: string;
  login42: string;
  username: string;
  userStatus: UserStatus;
  imagePath: string;
  authenticator: boolean;
  friends: Friends[];
  //blocked?: Friends[];
}
