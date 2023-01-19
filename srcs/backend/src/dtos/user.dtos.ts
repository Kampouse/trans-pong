import { UserStatus } from '@prisma/client';

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
