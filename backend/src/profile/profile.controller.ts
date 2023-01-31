import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Req, Res, Controller, Inject, Get, Header, Param, Post, UseInterceptors, Body, Redirect, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { PrivateProfileDto, PublicProfileDto, ActiveGameDto, Relation } from "src/dtos/profile.dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { responseDefault, responseUploadPhoto } from "src/dtos/responseTools.dtos";
import { UploadedFile } from "@nestjs/common";
import { RequestWithUser } from "src/dtos/auth.dtos";
import { extname } from "path";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    @Inject(AuthService)
    private readonly authService: AuthService

    //  Get the private profile information of the user logged
    @Get()
    @UseGuards(JwtAuthGuard)
    async getProfileEdit(@Req() request: RequestWithUser): Promise<PrivateProfileDto | Error> {
        try {
            const login42 = await this.profileService.authentificate(request);
            const privateProfile: PrivateProfileDto = await this.profileService.getProfileEdit(login42);
            return (privateProfile);
        } catch (error) {
            return (Error("Error: invalid token "));
        }
    }

    @Get('/relation/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    @UseGuards(JwtAuthGuard)
    async getUserRelation(@Param('username') username: string, @Req() request: RequestWithUser): Promise<Relation>
    {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined)
        {
            return (await this.profileService.getUserRelation(undefined, undefined));
        }
        const relation = await this.profileService.getUserRelation(login42, username);
        return (relation);
    }

    //  Get the public profile information of the username in /username
    @Get(':username')
    @Header('Content-type', 'application/json; charset=utf-8')
    @UseGuards(JwtAuthGuard)
    async getProfilePublic(@Param('username') username: string, @Req() request: RequestWithUser): Promise<PublicProfileDto> {
        const login42 = await this.profileService.authentificate(request);
        if (login42 == undefined || username == undefined) {
            return (await this.profileService.getProfilePublic(undefined, undefined));
        }
        const publicProfile = await this.profileService.getProfilePublic(login42, username);
        return (publicProfile);
    }

    //  Return all active games
    @Get('/active/game')
    @UseGuards(JwtAuthGuard)
    async getActiveGame(@Res() res, @Req() request: RequestWithUser) {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined) {
            res.status(401).send({ message: 'Error: Unauthorized.', status: '401' });
            return;
        }

        const response: ActiveGameDto = await this.profileService.getActiveGames();
        res.status(200).send({ message: response, status: '200' })
        return;
    }

    //  Return the auth activity in message
    @Get('/get/auth')
    @UseGuards(JwtAuthGuard)
    async getProfileAuth(@Res() res, @Req() request: RequestWithUser): Promise<ActiveGameDto> {
        const login42 = await this.profileService.authentificate(request);
        console.log(login42);
        if (login42 == undefined) {
            res.status(401).send({ message: 'Error: Unauthorized || !file', status: '401' });
            return;
        }

        const response = await this.profileService.getAuth(login42);
        if (response.error == true) {
            res.status(403).send({ message: "error", status: '403' });
            return;
        }
        if (response.message == 'innactive') {
            res.status(200).send({ message: response.message, status: '200' });
            return;
        }
        res.status(200).send({ message: response.message, status: '200' });
        return;
    }

    //  Return the image path of the user
    @Get('/get/photo')
    @UseGuards(JwtAuthGuard)
    async getProfilePhoto(@Res() res, @Req() request: RequestWithUser): Promise<responseDefault> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined) {
            res.status(401).send({ message: 'Error: Unauthorized || !file', status: '401' });
            return;
        }

        const response = await this.profileService.getPhoto(login42);
        if (response.error == true) {
            res.status(403).send({ message: "error", status: '403' });
            return;
        }
        res.status(200).send({ message: response.message, status: '200' });
        return;
    }

    //  Return the image path of the user
    //
    @UseGuards(JwtAuthGuard)
    @Get('/get/photo')
    async getAuth(@Res() res, @Req() request: RequestWithUser): Promise<responseDefault> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined) {
            res.status(401).send({ message: 'Error: Unauthorized || !file', status: '401' });
            return;
        }

        const response = await this.profileService.getPhoto(login42);
        if (response.error == true) {
            res.status(403).send({ message: "error", status: '403' });
            return;
        }
        res.status(200).send({ message: response.message, status: '200' });
        return;
    }

    //  Upload a photo and update photo path of a user
    @UseGuards(JwtAuthGuard)
    @Post('upload/photo')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: '../frontend/public',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        })
    }))
    async updatePhoto(@Res() res, @UploadedFile() file: Express.Multer.File, @Req() request: RequestWithUser): Promise<responseUploadPhoto> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || file == undefined) {
            res.status(401).send({ message: 'Error: Unauthorized || !file', status: '401' });
            return;
        }

        const response = await this.profileService.updatePhoto(file.filename, login42);
        if (response.error == true) {
            res.status(403).send({ message: response.message, status: '403' });
            return;
        }

        res.status(200).send({ message: response.message, status: '200' });
        return;
    }

    //  Update the username of the user authentificated

    @UseGuards(JwtAuthGuard)
    @Post('update/username')
    async updateUsername(@Res() res, @Body() newUsername: any, @Req() request: RequestWithUser): Promise<responseDefault> {
        const login42 = await this.profileService.authentificate(request);

        console.log(login42 + " asked to change username to " + newUsername.username)

        if (login42 == undefined || newUsername.username == undefined) {
            res.status(401).send({ message: 'Unauthorized', status: '401' });
            return;
        }

        //  Add userID validation when auth is done by JP
        const response = await this.profileService.updateUsername(newUsername.username, login42);
        if (response.error == true) {
            console.log("shit happened")
            res.status(403).send({ message: response.message, status: '403' });
            return;
        }
        res.status(200).send({ message: response.message, status: '200' });
        return;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/add/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async addFriend(@Param('username') username: string, @Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined) {
            return ({ error: "Authentification failed" });
        }

        this.profileService.addFriend(login42, username);
        return;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/remove/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async removeFriend(@Param('username') username: string, @Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined) {
            return ({ error: "Authentification failed" });
        }

        this.profileService.removeFriend(login42, username);
        return;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/deny/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async denyRequest(@Param('username') username: string, @Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined) {
            return ({ error: "Authentification failed" });
        }

        this.profileService.denyRequest(login42, username);
        return;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/block/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async blockUser(@Param('username') username: string, @Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined) {
            return ({ error: "Authentification failed" });
        }

        this.profileService.blockUser(login42, username);
        return;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/unblock/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async unblockUser(@Param('username') username: string, @Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined) {
            return ({ error: "Authentification failed" });
        }

        this.profileService.unblockUser(login42, username);
        return;
    }

    @UseGuards(JwtAuthGuard)
    @Get('create/googleAuth')
    @Header('Content-type', 'application/json; charset=utf-8')
    async createAuth(@Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined) {
            return ('failed');
        }
        return (this.authService.createAuth(login42));
    }

    @UseGuards(JwtAuthGuard)
    @Post('create/validation')
    @Header('Content-type', 'application/json; charset=utf-8')
    async validateCreation(@Body() token, @Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);
        if (login42 == undefined || token == undefined) {
            return { 200: "failed" }
        }
        const status = await this.authService.creationValidation(login42, token.token)
        return { 200: "success" }
    }

    @UseGuards(JwtAuthGuard)
    @Post('action/validate2fa')
    @Header('Content-type', 'application/json; charset=utf-8')
    async validate(@Body() token, @Req() request: RequestWithUser, @Res() res): Promise<any> {
        const login42 = await this.profileService.authentificate(request);
        console.log("login42: " + login42)
        if (login42 == undefined || token == undefined) {
            return { 200: "failed" }
        }
        const status = await this.authService.validate2fa(login42, token.token)
        console.log("status: " + status)
        if (status) {
            const token = await this.authService.process_poller(request, undefined, true);
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true })
            res.status(200)
            res.send({ 200: "success" })
        }
        else {
            res.status(403)
            res.send({ 403: "failed" })
        }
    }





    @UseGuards(JwtAuthGuard)
    @Post('remove/authenticator')
    @Redirect()
    @Header('Content-type', 'application/json; charset=utf-8')
    async removeAuth(@Body() token, @Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined || token == undefined) {
            return { statCode: 302, url: "http://localhost:3000/Profile" }
        }
        const status = this.authService.removeAuth(login42, token.token)
        return { statCode: 302, url: "http://localhost:3000/Profile" }
    }

    //  Get currently logged in user ID
    @UseGuards(JwtAuthGuard)
    @Get('/get/userid')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getUserId(@Req() request: RequestWithUser): Promise<any>
    {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined) {
            return ("undefined user!")
        }

        const userId = await this.profileService.getUserId(login42);
        return (userId);
    }

    //  Get currently logged in user ID

    @UseGuards(JwtAuthGuard)
    @Get('/play/solo')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getClientInfo(@Req() request: RequestWithUser): Promise<any> {
        const login42 = await this.profileService.authentificate(request);

        if (login42 == undefined) {
            return ("undefined user!")
        }

        const userId = await this.profileService.getSinglePlayerData(login42);
        return (userId);
    }

}
