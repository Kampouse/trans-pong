import { Req, Res, Controller, Get, Header, Param, Post, UseInterceptors, Body, Redirect} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { PrivateProfileDto, PublicProfileDto } from "src/dtos/profile.dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { responseDefault, responseUploadPhoto } from "src/dtos/responseTools.dtos";
import { UploadedFile } from "@nestjs/common";
import { RequestWithUser } from "src/dtos/auth.dtos";
import { extname } from "path";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {}

    //  Get the private profile information of the user logged
    @Get()
    async getProfileEdit(@Req() request: RequestWithUser) : Promise<PrivateProfileDto>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined)
        {
            return (await this.profileService.getProfileEdit(undefined));
        }

        const privateProfile: PrivateProfileDto = await this.profileService.getProfileEdit(login42);
        return (privateProfile);
    }

    //  Get the public profile information of the username in /username
    @Get(':username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getProfilePublic(@Param('username') username: string, @Req() request: RequestWithUser) : Promise<PublicProfileDto>
    {
        const login42 =  await this.profileService.authentificate(request);
 
        if (login42 == undefined || username == undefined)
        {
            return (await this.profileService.getProfilePublic(undefined));
        }
        const publicProfile = await this.profileService.getProfilePublic(username);
        return (publicProfile);
    }

    //  Return the image path of the user
    @Get('/get/photo')
    async getProfilePhoto(@Res() res, @Req() request: RequestWithUser) : Promise<responseDefault>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined)
        {
            res.status(401).send({ message: 'Error: Unauthorized || !file', status: '401' });
            return;
        }

        const response = await this.profileService.getPhoto(login42);
        if (response.error == true)
        {
            res.status(403).send({ message: "error", status: '403' });
            return;
        }
        res.status(200).send({ message: response.message, status: '200'});
        return;
    }

    //  Upload a photo and update photo path of a user
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
    async updatePhoto(@Res() res, @UploadedFile() file: Express.Multer.File, @Req() request: RequestWithUser) : Promise<responseUploadPhoto>
    {
        const login42 =  await this.profileService.authentificate(request);

        console.log(login42);
        console.log(file)

        if (login42 == undefined || file == undefined)
        {
            res.status(401).send({ message: 'Error: Unauthorized || !file', status: '401' });
            return;
        }

        const response = await this.profileService.updatePhoto(file.filename, login42);
        if (response.error == true)
        {
            res.status(403).send({ message: response.message, status: '403' });
            return;
        }

        res.status(200).send({ message: response.message, status: '200' });
        return;
    }

    //  Update the username of the user authentificated
    @Post('update/username')
    async updateUsername(@Res() res, @Body() newUsername: any, @Req() request: RequestWithUser) : Promise<responseDefault>
    {
        const login42 =  await this.profileService.authentificate(request);

        console.log(login42 + " asked to change username to " + newUsername.username)

        if (login42 == undefined || newUsername.username == undefined)
        {
            res.status(401).send({ message: 'Unauthorized', status: '401' });
            return;
        }

        //  Add userID validation when auth is done by JP
        const response = await this.profileService.updateUsername(newUsername.username, login42);
        if (response.error == true)
        {
            res.status(403).send({ message: response.message, status: '403' });
            return;
        }
        res.status(200).send({ message: response.message, status: '200' });
        return;
    }

    @Get('/add/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async addFriend(@Param('username') username: string, @Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined)
        {
            return ({error: "Authentification failed"});
        }

        this.profileService.addFriend(login42 ,username);
        return;
    }

    @Get('/deny/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async denyRequest(@Param('username') username: string, @Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined)
        {
            return ({error: "Authentification failed"});
        }

        this.profileService.denyRequest(login42 , username);
        return;
    }

    @Get('/block/:username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async blockUser(@Param('username') username: string, @Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined || username == undefined)
        {
            return ({error: "Authentification failed"});
        }

        this.profileService.blockUser(login42 , username);
        return;
    }

    @Get('create/googleAuth')
    @Header('Content-type', 'application/json; charset=utf-8')
    async createAuth(@Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined)
        {
            return ('failed');
        }
        return (this.profileService.createAuth(login42));
    }

    @Post('create/validation')
    @Redirect()
    @Header('Content-type', 'application/json; charset=utf-8')
    async validateCreation(@Body() token, @Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined || token == undefined)
        {
            return {statCode: 302, url: "http://localhost:5173/Profile" }
        }

         this.profileService.creationValidation(login42, token.token)
        return {statCode: 302, url: "http://localhost:5173/Profile" }
    }

    @Post('remove/authenticator')
    @Redirect()
    @Header('Content-type', 'application/json; charset=utf-8')
    async removeAuth(@Body() token, @Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined || token == undefined)
        {
            return {statCode: 302, url: "http://localhost:5173/Profile" }
        }

        console.log(login42, token.token)
        const status = this.profileService.removeAuth(login42, token.token)
        console.log(status)
        return {statCode: 302, url: "http://localhost:5173/Profile" }
    }

    //  Get currently logged in user ID
    @Get('/get/userid')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getUserId(@Req() request: RequestWithUser) : Promise<any>
    {
        console.log("test")
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined)
        {
           // return (await this.profileService.getProfileEdit(undefined));
           console.log("woops")
           return("undefined user!")
        }

        //const privateProfile: PrivateProfileDto = await this.profileService.getProfileEdit(login42);
        const userId = await this.profileService.getUserId(login42);
        //console.log(userId)
        return (userId);
    }

        //  Get currently logged in user ID
    @Get('/play/solo')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getClientInfo(@Req() request: RequestWithUser) : Promise<any>
    {
        console.log("test")
        const login42 =  await this.profileService.authentificate(request);

        if (login42 == undefined)
        {
            return("undefined user!")
        }

        const userId = await this.profileService.getSinglePlayerData(login42);
        return (userId);
    }

}
