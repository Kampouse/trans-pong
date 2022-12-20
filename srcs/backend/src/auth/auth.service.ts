import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, User, RequestWithUser, SessionUser } from "src/dtos/auth.dtos";
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService
{
    constructor(private jwtService: JwtService) { }

    async validate_token(input: string)
    {
        let token = input
        try
        {
            const secret = 'secret'
            const decoded = this.jwtService.verify(token, { secret });
            return true
        }
        catch (error)
        {
            return false
        }
  }

    async verify2(token: string)
    {
        const auth = await prisma.auth.findUnique({ where: { bearerToken: token } });
        if (auth)
        {
            const token = auth.bearerToken;
            const secret = 'secret'; // private key for jwt should be in env
            const expiresIn = '1d';
            const decoded = this.jwtService.verify(token, { secret });
            if (decoded)
            {
                return decoded;
            }
            else
            {
                return false;
            }
        }
        return false;
    }

    async create(apiResponse: RequestWithUser)
    {
        const prisma = new PrismaClient();

        // Look in the database if the user exist
        const user = await prisma.user.findUnique({
            where:
            {
                login42: apiResponse.user.username
            }
        })

        //  If he dosen't, create him
        if (!user)
        {
            try
            {
                await prisma.user.create ({
                    data: {
                        login42: apiResponse.user.username,
                        username: apiResponse.user.username,
                        accessToken: apiResponse.user.accessToken,
                        refreshToken: apiResponse.user.refreshToken
                    }
                })
                await prisma.$disconnect();
                return (apiResponse.user.username);
            }
            catch
            {
                await prisma.$disconnect();
                return ({error: "User creation in the database failed."})
            }
        }
        await prisma.$disconnect();
        return (apiResponse.user.username)
    }

  async exists(username: string)
  {
    const data = await prisma.user.findUnique({ where: { username: username }});
    if (data)
    {
    }
    return data;
  }

  async findOne(username: string)
  {
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

  remove(id: number)
  {
    return `This action removes a #${id} user`;
  }

  async createToken(passport: any)
  {
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
  
    async validateUser(payload: any)
    {
        return {};
    //   return await this.findOne(payload.username);
    }
}
