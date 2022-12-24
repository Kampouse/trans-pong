import { Req, Res, Controller, Get, Header, Param, Post, UseInterceptors, Body, Redirect} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateUsernameDto } from "src/dtos/profile.dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UploadedFile } from "@nestjs/common";
import { RequestWithUser } from "src/dtos/auth.dtos";
import { extname } from "path";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {}

    //  Get the private profile information of the user logged
    @Get()
    async getProfileEdit(@Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (!login42)
        {
            return {error: "Authentification failed"};
        }

        //  Add userID validation when auth is done by JP
        const privateProfile = await this.profileService.getProfileEdit(login42);
        return (privateProfile);
    }

    //  Get the public profile information of the username in /username
    @Get(':username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getProfilePublic(@Param('username') username: string, @Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);
 
        if (login42 == null)
        {
            return ({error: "Authentification failed"});
        }

        const publicProfile = await this.profileService.getProfilePublic(username);
        return (publicProfile);
    }

    //  Upload a photo and update photo path of a user
    //  send in body: content-type: form-data / key: file /value: file to upload
    //  TODO: add authentification validation
    @Post('upload/photo')
    @Redirect()
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
    async updatePhoto(@UploadedFile() file: Express.Multer.File, @Req() request: RequestWithUser) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        if (!login42 || file == undefined)
        {
            return {statCode: 302, url: "http://localhost:5173/Profile" }
        }
        console.log(login42);
        this.profileService.updatePhoto(file.filename, login42);
        console.log("Photo updated")
        return {statCode: 302, url: "http://localhost:5173/Profile" }
    }

    //  Update the username of the user authentificated
    //  TODO: add authentification validation
    @Post('update/username')
    @Redirect()
    async updateUsername(@Body() updateUsernameDto: UpdateUsernameDto, @Req() request: RequestWithUser, @Res() res) : Promise<any>
    {
        const login42 =  await this.profileService.authentificate(request);

        console.log(login42 + " asked to change username to " + updateUsernameDto.newUsername)

        if (login42 == undefined || updateUsernameDto.newUsername == undefined)
        {
            return {statCode: 302, url: "http://localhost:5173/Profile" }
        }

        //  Add userID validation when auth is done by JP
        const response = this.profileService.updateUsername(updateUsernameDto.newUsername, login42);
        if (!response)
        {
            return {statCode: 302, url: "http://localhost:5173/Profile" }
        }
        return {statCode: 302, url: "http://localhost:5173/Profile" }
    }
}
