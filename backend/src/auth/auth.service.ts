import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
 
  create(createUserDto: CreateAuthDto) {
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
  /*
  exists(email: string, username: string) {
    let output = prisma.user.findMany({
        where: {
            email: email,
            username: username,
        },
        select: {
            id: true,
        },
    });
    // return true or false if the user exists 
    return output
  }
   */
  

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }



  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}




