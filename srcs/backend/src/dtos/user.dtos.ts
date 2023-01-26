import { userStatus } from '@prisma/client';

export class UserDto {
  userID: string;
  login42: string;
  username: string;
  userStatus: userStatus;
  imagePath: string;
  authenticator: boolean;
  friends: UserDto[];
  blocked?: UserDto[];
}
