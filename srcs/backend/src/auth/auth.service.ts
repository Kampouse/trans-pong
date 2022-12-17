import { Console } from 'console';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../main';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async validate_token(input: string) {
    let token = input
    try {
      const secret = 'secret'
      const decoded = this.jwtService.verify(token, { secret });
      return true
    }
    catch (error) {
      return false
    }
  }
  /*
  async verifyToken(createUserDto: CreateAuthDto) {
      const userFields = await prisma.profile.findUnique({
        where: { username: createUserDto.username },
      });
      const userId = userFields.userId;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const authId = user.authid;
      const auth = await prisma.auth.findUnique({ where: { id: authId } });
      if (auth) {
        //check if auth data is valid and return auth data
        const token = auth.bearerToken;
        const secret = 'secret'; // private key for jwt should be in env
        const expiresIn = '1d';
        const decoded = this.jwtService.verify(token, {secret});
        if (decoded) {
          return true;
        }
        else  {
          return false;
        }
      }
      return true;
  }
  */
  async verify2(token: string) {
    const auth = await prisma.auth.findUnique({ where: { bearerToken: token } });
    if (auth) {
      const token = auth.bearerToken;
      const secret = 'secret'; // private key for jwt should be in env
      const expiresIn = '1d';
      const decoded = this.jwtService.verify(token, { secret });
      if (decoded) {
        return decoded;
      }
      else {
        return false;
      }
    }
    return false;
  }
  async create(createUserDto: CreateAuthDto) {
    try {
      const user = await this.exists(createUserDto.username)
      if (user)
        return false;
      if (!user) {
        const user = await prisma.user.create({
          data:
          {
            login42: createUserDto.username,
            username: createUserDto.username,
            imagePath: '/jvigneauPhoto.jpeg',
          }
        });
         return true
      }       
    } catch (error) {
    }

    //find if user exists
    /*
   const data = {
     username: createUserDto.username,
     displayName: createUserDto.displayName,
   };
   //checkout if user exists
   const userExists = await this.exists(data.username);
   if (userExists) {
      return this.verifyToken(createUserDto)
   }
   const stats = await prisma.stats.create({ data: {} });
   const ranking = await prisma.ranking.create({ data: {} });
   const  auth  = await prisma.auth.create({ data: {} });
   //create thee user with a auth relation 
   const user = await prisma.user.create({ data: {authid: auth.id} });
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
   */
  }

  async exists(username: string) {
    const data = await prisma.user.findUnique({
      where: { username: username },
    });
    if (data) {
    }
    return data;

  }

  async findOne(username: string) {
    /*
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
*/
    return {};
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createToken(passport: any) {
    /*
      type passportType = {
         id : string,
          username: string,
          displayName: string,
          accessToken: string,
          refreshToken: string
      }
      let input: passportType = passport 
      const username = input.username;
      const payload = { username };
      const secret = 'secret'; // private key for jwt should be in env
      const expiresIn = '1d'; 
      const token = this.jwtService.sign(payload, { secret, expiresIn });
       type auth = {
         accessToken: string;
         refreshToken: string;
         bearerToken: string;
         authid?: string;
       };
   const userFields =     await  prisma.profile.findUnique({ where: { username: username } })
        const userId = userFields.userId;
        const user   =   await  prisma.user.findUnique({ where: { id: userId } }) 
        const authId = user.authid;
        const auth = await prisma.auth.findUnique({ where: { id: authId } });
        if(auth && auth.bearerToken && await this.verifyToken(input) == true) 
              return token;
        else 
        {
          const data: auth = {
            accessToken: input.accessToken,
            refreshToken: input.refreshToken,
            bearerToken: token,
          };
          const newAuth = await prisma.auth.create({ data });
          await prisma.user.update({
            where: { id: userId },
            data: { authid: newAuth.id },
          });
          if (auth) {
            await prisma.auth.delete({ where: { id: auth.id } });
          }
      }
      */
  }


  async validateUser(payload: any) {
    //   return await this.findOne(payload.username);
    return {};
  }
}
