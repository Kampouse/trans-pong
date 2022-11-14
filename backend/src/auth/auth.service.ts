import { Console } from 'console';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../main';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async create(createUserDto: CreateAuthDto) {
    this.jwtService.sign({ username: createUserDto.username });
    const data = {
      username: createUserDto.username,
      displayName: createUserDto.displayName,
    };
    const user = await prisma.user.create({ data: {} });
    const stats = await prisma.stats.create({ data: {} });
    const ranking = await prisma.ranking.create({ data: {} });
    // to add anything else to the profile, add it here
    //specify  by id of the elemement you want to add it to

    const profile = await prisma.profile.create({
      data: {
        username: createUserDto.username,
        displayName: createUserDto.displayName,
        userId: user.id,
        statsId: stats.id,
        rankingId: ranking.id,
      },
    });
    return profile;
  }
  async exists(username: string) {
    console.log(username);
    const data = await prisma.profile.findUnique({
      where: { username: username },
    });

    return data;
  }

  async findOne(username: string) {
    //return user profile
    const data = await prisma.profile.findUnique({
      where: { username: username },
    });
    if (data) {
      const data_shape = {
        username: data.username,
        displayName: data.displayName,
        image: data.image,
        userId: data.userId,
      };
      return data_shape;
    }

    return {};
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
