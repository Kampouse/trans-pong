import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {prisma} from '../main'
@Injectable()
export class AuthService {
 
  create(createUserDto: CreateAuthDto) {
      let data = {
          email: createUserDto.email,
		  displayName: createUserDto.displayName,
          username: createUserDto.username,
      };
        let output = prisma.user.create({ data: data });
          if(output != null){
			  console.log("user created");
            return output;
          }
          else{

			  console.log("not created");
			
            return null
          }
  }

  findAll() {
        let output  = prisma.user.findMany(); 
        return output;
  
  }
  
  exists( username: string) {
    let output = prisma.user.findMany({
        where: {
            username: username,
        },
        select: {
            id: true,
        },
    });
    return output
  }
   
  

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }



  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}




