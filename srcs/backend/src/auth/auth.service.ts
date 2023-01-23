import { Injectable, Res } from '@nestjs/common';
import * as authenticator from 'authenticator';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser, passportType, SessionUser } from "src/dtos/auth.dtos";
import { prisma } from 'src/main'
type validateUser = { response: { url: string, statCode: number }, user_validity: { token: boolean, user: string | null } }
type tokenDatas = { username: string, iat: number, exp: number }
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    public async validate_token(token: string): Promise<string | null> {
        if (!token) {
            return (null)
        }
        try {
            const secret = process.env.JWT_KEY;
            const decoded = this.jwtService.verify(token, { secret }) as tokenDatas;
            if (decoded && decoded.username) {
                const output = await this.doesUserExist(decoded.username)
                if (output) {
                    return (output as string)
                }
            }
            return (null);
        }
        catch (error) {
            return (null);
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
            return new Error("User creation failed or token creation failed or  the request may not be valid")
        }
    }
    public async redirect_poller(headers, req: RequestWithUser): Promise<validateUser> {
        const is_valid = await this.validate_token(headers.cookie?.split("=")[1])
        const user_data = await this.doesUserExist(req.user.username)

        return {
            response:
            {
                statCode: 302,
                url: "http://localhost:5173/"
            },
            user_validity:
            {
                token: is_valid !== null ? true : false, user: user_data,
            }
        }
    }
    async createToken(validate: string): Promise<string | null> {
        const user = await prisma.user.findUnique({ where: { login42: validate } })
        const secret = process.env.JWT_KEY; // private key for jwt should be in env
        const expiresIn = '1d';
        const token = this.jwtService.sign(
            { username: validate },
            { secret, expiresIn });
        const output = await prisma.user.update({
            where: {
                login42: user.login42
            },
            data: {
                jwtToken: token
            }
        })
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

    async doesUserExist(username: string): Promise<string> {
        try {

            const user = await prisma.user.findUnique({
                where:
                {
                    login42: username
                }
            })
            if (user) {
                const login42 = user.login42;
                return (login42);
            }
        }
        catch (error) {
            return (null)
        }
        return null;
    }

    public async authentificateSession(data: any): Promise<string> {
        let request = data;
        //find if the cookie in the headers
        //look if 
        const cookie_string = request?.headers['cookie']?.split("=")[1]
        if (cookie_string) {
            const is_valid = await this.validate_token(cookie_string)
            if (is_valid) {
                return (is_valid as string)
            }
        }
        else {
            return (null)
        }
    }


    async createAuth(login42: string) {
        //  Look if the user already has a key generated
        //  If the user already has a key, load a qr code associated
        try {
            const user = await this.findLogin(login42)
            if (user.authKey != "none") {
                console.log("Key already exist")
                let otAuth = authenticator.generateTotpUri(user.authKey, login42 + "@42qc.ca", "Trans-Pong", 'SHA1', 6, 30);
                return ({ QRcode: otAuth });
            }
            //  Else, create a new key
            const formattedKey = authenticator.generateKey();

            const ouputUser = await this.findLogin(login42)
            if (!ouputUser || ouputUser.authenticator == true) {
                return ({ QRcode: 'failed' });
            }
            await prisma.user.update({
                where: {
                    login42: login42
                },
                data: {
                    authKey: formattedKey
                }
            })
            const otAuth = authenticator.generateTotpUri(formattedKey, login42 + "@42qc.ca", "Trans-Pong", 'SHA1', 6, 30);
            return ({ QRcode: otAuth });
        }
        catch
        {
            throw new Error("Error in  2fa creation")
        }

    }

    async should2fa(login42: string) {
        try {
            const user = await this.findLogin(login42)
            if (user.authenticator == true) {
                return ({ active: true, should2fa: true })
            }
            console.log("2fa not active")
            return ({ active: false, should2fa: false })
        }
        catch {
            throw new Error("Error in 2fa validation")
        }
    }

    async creationValidation(login42: string, token: string) {
        try {
            const formattedToken = this.parse2fa(token);
            const user = await this.findLogin(login42)
            let fa2Status = authenticator.verifyToken(user.authKey, formattedToken);
            if (fa2Status != null && user) {

                await prisma.user.update({
                    where: {
                        login42: login42
                    },
                    data: {
                        authenticator: true
                    }
                })
            }
        }
        catch {
            throw new Error("Error in 2fa validation creation")
        }
    }
    findLogin = async (login42: string) => {
        try {
            const output = await prisma.user.findUnique({
                where: {
                    login42: login42
                }
            })
            return output
        } catch (error) {
            console.log(error)
            return null
        }
    }

    parse2fa = (input: string) => {
        const output = String(input).split(' ').join('')
        return output.length === 6 ? output : ""
    }

    remove2fa = async (input: any, token: string) => {
        const updateUser = async (login42: string) => {
            try {
                await prisma.user.update({
                    where: { login42: login42 },
                    data: { authenticator: false, authKey: "none" }
                })
                return true
            } catch (error) {
                return false
            }
        }
        if (input && token) {
            const vaidated = authenticator.verifyToken(input.authKey, token)
            return vaidated ? updateUser(input.login42) : false
        }
        else {
            return false
        }
    }

    async removeAuth(login42: string, token: string) {
        const formattedToken = this.parse2fa(token);
        const user = await this.findLogin(login42);
        const output = await this.remove2fa(user, formattedToken);
        return output
    }
}