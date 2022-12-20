import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser, SessionUser, passportType } from "src/dtos/auth.dtos";
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
            const secret = 'secret';
            const decoded = this.jwtService.verify(token, { secret });
            return (true);
        }
        catch (error)
        {
            return (false);
        }
    }

    async linkToken(token: any, username: string)
    {
        //  Look if the username in the tokken is valid
        const prisma = new PrismaClient();

        try
        {
            const newUser = await prisma.user.findUnique(
                {
                    where:
                    {
                        login42: username
                    }
                })

            if (!newUser)
            {
                await prisma.$disconnect();
                return (false)
            }
        }
        catch
        {
            await prisma.$disconnect();
            return (false)
        }

        try
        {
            await prisma.user.update({
                where: {
                    login42: username
                },
                data: {
                    jwtToken: token
                }
            })
            await prisma.$disconnect();
            return (true);
        }
        catch
        {
            await prisma.$disconnect();
            return (false);
        }
    }

    async createToken(passport: any)
    {
        let input: passportType = passport;
        const username = input.username;
        if (username == undefined)
        {
            return (false);
        }
        const payload = { username };
        const secret = 'secret'; // private key for jwt should be in env
        const expiresIn = '1d'; 
        const token = this.jwtService.sign(payload, { secret, expiresIn });
        if (this.validate_token(token))
        {
            if (this.linkToken(token, username))
            {
                return (token);
            }
        }
        return (false)
    }

    async createUser(apiResponse: RequestWithUser)
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
                        accessToken42: apiResponse.user.accessToken,
                        refreshToken42: apiResponse.user.refreshToken
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

    async doesUserExist(apiResponse: RequestWithUser) : Promise<any>
    {
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where:
            {
                login42: apiResponse.user.username
            }
        })

        if (user)
        {
            const login42 = user.login42;
            await prisma.$disconnect();
            return (login42);
        }
        await prisma.$disconnect();
        return (false);
    }

}
