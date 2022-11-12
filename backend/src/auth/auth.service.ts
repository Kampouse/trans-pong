import { Console } from 'console';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { prisma } from '../main';
@Injectable()
export class AuthService {
  async create(createUserDto: CreateAuthDto) {
    const data = {
      username: createUserDto.username,
    };
    console.log(data);
    const output = await prisma.user.create({ data: data });
    if (output != null) {
      console.log('user created');
      return output;
    } else {
      console.log('not created');

      return null;
    }
  }

  async findAll() {
    const output = await prisma.user.findMany();
    return output;
  }

  async exists(username: string) {
    console.log(username);
    const data = await prisma.user.findUnique({
      where: { username: username },
    });
    console.log(data);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
