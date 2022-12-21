import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser, passportType } from "src/dtos/auth.dtos";
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
            const secret = process.env.JWT_KEY;
            const decoded = this.jwtService.verify(token, { secret });
            if (decoded)
            {
                return (true);
            }
            return (false);
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
        //  Get the username of the session logged with 42api
        let input: passportType = passport;
        const username = input.username;
        if (username == undefined)
        {
            return (false);
        }

        //  Validate if the username already has a tokken
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where: {
                login42: username
            }
        })

        //  If the user did not dosent exist, username got spoof
        if (!user)
        {
            //  Log ip of spoof try here in real life project and black list IP
            await prisma.$disconnect();
            return (false)
        }

        if (user.jwtToken)
        {
            if (this.validate_token(user.jwtToken))
            {
                //  Refresh token here if the tokken is valid
                //  TODO: add refresh token here
                await prisma.$disconnect();
                return (user.jwtToken);
            }
            else
            {
                // Delete expired and create a new one after this
                try
                {
                    await prisma.user.update({
                        where: {
                            login42: user.login42
                        },
                        data: {
                            jwtToken: null
                        }
                    })
                }
                catch
                {
                    console.error("prisma error on deleting expired token of user " + user.login42);
                }
            }
        }

        // Create a token for the user, and link it with him
        const payload = { username };
        const secret = process.env.JWT_KEY; // private key for jwt should be in env
        const expiresIn = '1d'; 
        const token = this.jwtService.sign(payload, { secret, expiresIn });
        console.log("token = " + token)
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
