import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, User, userStatus } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private httpService: HttpService,
    @Inject(prisma) private prisma: PrismaClient,
  ) {}

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
  private entityToDto(user: User): UserDto {
    const userDto = new UserDto();

    userDto.id = user.userID;
    userDto.name = user.username;
    userDto.status = user.userStatus;
    userDto.friends = user.friends
      ? user.friends.map((x) => this.entityToDto(x))
      : [];
    userDto.blocked = user.blocked
      ? user.blocked.map((x) => this.entityToDto(x))
      : [];

    return userDto;
  }

  // Create a User
  public async create(createUserDto: User) {
    try {
      const user = await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          userID: createUserDto.userID,
        },
      });
    } catch (error) {
      console.log(error);
    }
    const userDto = this.entityToDto(user);
    return userDto;
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
