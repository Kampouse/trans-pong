//  Dto class for User
import { userStatus } from '@prisma/client';

export class UserDto {
  id: string;
  name: string;
  status: userStatus;
  friends: UserDto[];
  blocked: UserDto[];
}
