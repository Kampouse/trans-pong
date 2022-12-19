import { Console } from 'console';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as dtos from  "../dtos/profile.dtos"
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
  }

  async exists(username: string) {
    const data = await prisma.user.findUnique({ where: { username: username }});
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
        return token
      return this.validate_token(token)
      }
  async validateUser(payload: any) {
    //   return await this.findOne(payload.username);
    return {};
  }
}