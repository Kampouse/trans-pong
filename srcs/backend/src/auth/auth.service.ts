import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser, passportType, SessionUser } from "src/dtos/auth.dtos";
import { prisma } from 'src/main'
type validateUser = { response: { url: string, statCode: number }, user_validity: { token: boolean, user: string | null } }

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    public validate_token(input: string) {
        let token = input
        if (!token) {
            return (false)
        }
        try {
            const secret = process.env.JWT_KEY;
            const decoded = this.jwtService.verify(token, { secret });
            if (decoded) {
                return (true);
            }
            return (false);
        }
        catch (error) {
            return (false);
        }
    }

    public process_poller = async (req: RequestWithUser, redirect_content: validateUser): Promise<string | null | Error> => {
        let user = redirect_content?.user_validity?.user;
        try {
            if (!redirect_content.user_validity.user) {
                user = await this.createUser(req)
            }
            return await this.createToken(user)
        }
        catch {
            return new Error("User creation failed or token creation faile")
        }
    }
    public async redirect_poller(headers, req: RequestWithUser): Promise<validateUser> {
        const is_valid = this.validate_token(headers.cookie?.split("=")[1])
        const exist = await this.doesUserExist(req)
        return {
            response:
            {
                statCode: 302,
                url: "http://localhost:5173/"
            },
            user_validity:
            {
                token: is_valid, user: exist
            }
        }
    }
    async createToken(validate: string): Promise<string | null> {
        console.log("User is valid?", validate)
        const user = await prisma.user.findUnique({ where: { login42: validate } })
        const secret = process.env.JWT_KEY; // private key for jwt should be in env
        const expiresIn = '1d';
        const token = this.jwtService.sign(
            { username: validate },
            { secret, expiresIn });

        console.log("Token is valid?", user.login42)
        const output = await prisma.user.update({
            where: {
                login42: user.login42
            },
            data: {
                jwtToken: token
            }
        })
        console.log("Token is valid?", output)
        return token
    }


    async createUser(apiResponse: RequestWithUser): Promise<string | null> {
        const output = await prisma.user.create({
            data: {
                login42: apiResponse.user.username,
                username: apiResponse.user.username,
                accessToken42: apiResponse.user.accessToken,
                refreshToken42: apiResponse.user.refreshToken
            }
        })
        return (output?.login42)
    }

    async doesUserExist(apiResponse: RequestWithUser): Promise<string> {
        const user = await prisma.user.findUnique({
            where:
            {
                login42: apiResponse.user.username
            }
        })
        if (user) {
            const login42 = user.login42;
            return (login42);
        }
        return null;
    }

    public async authentificateSession(data: any): Promise<string> {
        let request: RequestWithUser = data;

        if (data == undefined) {
            return (null)
        }

        const sessionStore = request['sessionStore'];

        if (sessionStore == undefined) {
            return (null)
        }

        const type: SessionUser = sessionStore['sessions'];

        if (type == undefined) {
            return (null)
        }

        const groups = { ...type };

        if (groups == undefined) {
            return (null)
        }

        const js = Object.values(groups)[0];

        if (js == undefined) {
            return (null)
        }

        const parsed = JSON.parse(js);

        if (parsed == undefined) {
            return (null)
        }

        const passport = parsed['passport'];

        if (passport == undefined) {
            return (null)
        }

        const username = passport.user.username;

        if (username == undefined) {
            return (null)
        }

        //  Validate if the username already has a tokken

        const user = await prisma.user.findUnique({
            where: {
                login42: username
            }
        })

        //  If the user did not dosent exist, username got spoof
        if (!user) {
            //  Log ip of spoof try here in real life project and black list IP
            return (null)
        }

        if (user.jwtToken) {
            if (this.validate_token(user.jwtToken)) {
                //  Refresh token here if the tokken is valid
                //  TODO: add refresh token here
                await prisma.$disconnect();
                return (username);
            }
        }
        return (null)
    }
}
