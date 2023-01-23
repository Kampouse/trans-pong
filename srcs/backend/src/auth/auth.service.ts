import { Injectable, Res } from '@nestjs/common';
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
            return new Error("User creation failed or token creation faile")
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
        let request: Request = data;
        const cookie_string = request.headers['cookie']?.split("=")[1]
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
        'use strict';

        let authentificator = require('authenticator');

        //  Look if the user already has a key generated

        let user;

        try {
            user = await prisma.user.findUnique({
                where: {
                    login42: login42
                }
            })
        }
        catch { }

        //  If the user already has a key, load a qr code associated
        if (user.authKey != "none") {
            console.log("Key already exist")
            let otAuth = authentificator.generateTotpUri(user.authKey, login42 + "@42qc.ca", "Trans-Pong", 'SHA1', 6, 30);
            return ({ QRcode: otAuth });
        }

        //  Else, create a new key

        let formattedKey = authentificator.generateKey();

        try {
            user = await prisma.user.findUnique({
                where: {
                    login42: login42
                }
            })

            if (!user || user.authenticator == true) {
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

            let otAuth = authentificator.generateTotpUri(formattedKey, login42 + "@42qc.ca", "Trans-Pong", 'SHA1', 6, 30);
            return ({ QRcode: otAuth });
        }
        catch
        { }

    }

    async creationValidation(login42: string, token: string) {
        'use strict';

        let authenticator = require('authenticator');

        //  Validate token entered and format it
        token.trim();
        if (token.length != 6 && !(token.length == 7 && token[3] == ' ')) {
            return (null)
        }

        let formattedToken;

        if (token.length == 7) {
            formattedToken = token.substring(0, 3) + token.substring(4, 7);
        }
        else {
            formattedToken = token;
        }

        let user;

        //  Get user and protection
        try {
            user = await prisma.user.findUnique({
                where: {
                    login42: login42
                }
            })

            if (!user || !user.authKey) {
                return (null);
            }
        }
        catch { }

        let status = authenticator.verifyToken(user.authKey, formattedToken);

        if (status != null) {
            try {
                await prisma.user.update({
                    where: {
                        login42: login42
                    },
                    data: {
                        authenticator: true
                    }
                })
            }
            catch { }
        }
        return (status)
    }

    async removeAuth(login42: string, token: string) {
        let authenticator = require('authenticator');
        const parseInput = (input: string) => {
            const output = String(input).split(' ').join('')
            return output.length === 6 ? output : ""
        }
        const findUser = async (login42: string) => {
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
        const removeAuth = async (input: any, token: string) => {
            if (input && token) {
                const vaidated = authenticator.verifyToken(input.authKey, token)
                return vaidated ? updateUser(input.login42) : false
            }
            else {
                return false
            }
        }
        const formattedToken = parseInput(token);
        const user = await findUser(login42);
        const output = await removeAuth(user, formattedToken);
        return output
    }
}