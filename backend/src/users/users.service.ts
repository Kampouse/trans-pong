import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '../main'
@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
      let data = {
          email: createUserDto.email,
          username: createUserDto.username,
      };
        let output = prisma.user.create({ data: data });
          if(output != null){
            return output;
          }
          else{
            return null
          }
  }

  findAll() {
        let output  = prisma.user.findMany(); 
        return output;
  
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
