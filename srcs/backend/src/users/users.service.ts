import { Injectable } from '@nestjs/common';
import { User, userStatus } from '@prisma/client';

@Injectable()
export class UsersService {
  public async findAll() {
    const users: User[] = await prisma.user.findMany({
      where: {
        username: {
          not: null,
        },
      },
    });
    return users;
  }

  //  Find one user by id.
  public async findOneById(id: string) {
    const user: User = await prisma.user.findUnique({
      where: { userID: id },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  public async setStatus(id: string, status: userStatus): Promise<User> {
    const user: User = await prisma.user.findUnique(id);

    if (!user) {
      return null;
    }

    user.userStatus = status;
    await prisma.user.update;

    return user;
  }
}
