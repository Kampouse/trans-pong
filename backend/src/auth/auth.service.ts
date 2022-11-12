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
      displayName: createUserDto.displayName,
    };
	const user = await prisma.user.create({ data: {} });
	const stats = await prisma.stats.create({ data: {} });
	const profile = await prisma.profile.create({ data: {
		username: createUserDto.username,
		displayName: createUserDto.displayName,
		stats: { connect: { id: stats.id } },
		userId : user.id
		} });
		 	return profile;
		}
		
    //const user = await prisma.user.create({ data: data});
	//const ranking = await prisma.ranking.create({ data: { userId: user.id }});
	 
/*
    const profile_data= {
		 	  userId: user.id,
			username: createUserDto.username,
			ranking : ranking.id,
			
    };
	*/
/*
const profile = await prisma.profile.create({ data: { userId: user.id, username: createUserDto.username}});
  
    if (user != null) {
      console.log('user created');
      return user;
    } else {
      console.log('not created');
      return null;
    }
  }
  */
/*
  async findAll() {
    const output = await prisma.user.findMany();
    return output;
  }
*/

  async exists(username: string) {
    console.log(username);
    const data = await prisma.profile.findUnique({
      where: { username: username },
    });
    return data;
  }


/*
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */
}
