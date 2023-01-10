import { Injectable,Headers } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser, passportType, SessionUser } from "src/dtos/auth.dtos";
import { PrismaClient } from '@prisma/client';
import {prisma } from 'src/main'

type auth_output = {username : string, iat: string, exp: string}
@Injectable()

export class AuthService
{

    constructor(private jwtService: JwtService) { 
    }

    public async validate_token(input: string)
    {
        if( !input)
            return false
        const token = input
        const secret = process.env.JWT_KEY;
         try {
             this.jwtService.verify(token, { secret })
             return (true)
         }
          catch {
                return false
          }
    }
        
    public  authenticate  (auth_header): auth_output | null 
    {
        let  input   = auth_header?.cookie.split("=")[1]
        if( !input)
            return null
        const token = input
        const secret = process.env.JWT_KEY;
         try {
            const decoded = this.jwtService.verify(token, { secret })

             return (decoded)
         }
          catch {
                return  null
          }
    }

//to do
    refresh_token(input: string)
    {
        const token = input
        const secret = process.env.JWT_KEY;
        const expiresIn = '1d';
        try {
            const decoded = this.jwtService.verify(token, { secret })
            const payload = { username: decoded.username };
            const new_token = this.jwtService.sign(payload, { secret, expiresIn }); 
        }
         catch {}
    }
    async createToken(input:  passportType )
    {
        const username =  input.username;
        if(!username)
            {
            throw new Error("user is nobody?");
                return  null
            }
       this.doesUserExist(input).then().catch(() => { Error("Failed to find user in database")})
        const payload = { username };
        const secret = process.env.JWT_KEY; // private key for jwt should be in env
        const expiresIn = '1d'; 
        const token = this.jwtService.sign(payload, { secret, expiresIn });
        const is_valid = await this.validate_token(token)
        if (is_valid === true)
        {
                prisma.user.update({ 
                where : {
                    login42: username
                }, 
                data: {accessToken42: token}}).then((token) => { return  token})
                    .catch(() => { Error("Failed to update token in database")})
                     return token
        }
        return (null)
    }

    async createUser(apiResponse: passportType)
    {
     this.doesUserExist(apiResponse).then ( (user) => { 
        if(user)
             return (true)// should we return anything?
         prisma.user.create ({
            data: {
                login42: apiResponse.username,
                username: apiResponse.username,
                accessToken42: apiResponse.accessToken,
                refreshToken42: apiResponse.refreshToken
            }
        }).then ( () => {
             return (true) }).catch(() => 
            {
                 return (false) }) // should it return anything?
        })
    }

    async doesUserExist(apiResponse: passportType) : Promise<any>
    {
        const username = apiResponse.username
        if(!username)
            return null
        const user = await prisma.user.findUnique({
            where: {login42: username}
        })
    }
}