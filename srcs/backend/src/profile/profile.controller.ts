import { Controller, Get, Header, Param, Post, UseInterceptors, Body} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateUsernameDto } from "src/dtos/profileUpdate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UploadedFile } from "@nestjs/common";
import { extname } from "path";

const useID = "clbuy4ib40000mmn854tpzlpk"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {}

    //  Get the private profile information of the user logged
    @Get()
    @Header('Content-type', 'application/json; charset=utf-8')
    async getProfileEdit() : Promise<any>
    {
        //  Add userID validation when auth is done by JP
        const reponse = this.profileService.getProfileEdit(useID);
        if ((await reponse).error == true)
            return ({404: 'user not found.'});
        return reponse;
    }

    //  Get the public profile information of the username in /username
    @Get(':username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getProfilePublic(@Param('username') username: string) : Promise<any>
    {
        const reponse = this.profileService.getProfilePublic(username);
        if ((await reponse).error == true)
            return ({404: 'user not found.'});
        return reponse;
    }

    //  Upload a photo and update photo path of a user
    //  send in body: content-type: form-data / key: file /value: file to upload
    //  TODO: add authentification validation
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
    async updatePhoto(@UploadedFile() file: Express.Multer.File) : Promise<any>
    {
        //  Add userID validation when auth is done by JP
        this.profileService.updatePhoto(file.filename, useID);
        return ({success: "photo upload successful"});
    }

    //  Update the username of the user authentificated
    //  TODO: add authentification validation
    @Post('update/username')
    async updateUsername(@Body() updateUsernameDto: UpdateUsernameDto) : Promise<any>
    {
        //  Add userID validation when auth is done by JP
        const response = this.profileService.updateUsername(updateUsernameDto);
        if (!response)
        {
            console.log(updateUsernameDto);
            return ({error: "authentification failed"});
        }
        return ({success: "username update successfull"});
    }
}
