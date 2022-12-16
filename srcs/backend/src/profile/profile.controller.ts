import { Controller, Get, Header, Param, Post, Req, UseInterceptors} from "@nestjs/common";
import { FileInterceptor} from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common";
import { ProfileService } from "./profile.service"

const useID = "clbp6ol6s000el4mm649mauz0"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {}

    @Get(':username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getProfilePublic(@Param('username') username: string) : Promise<any>
    {
        const reponse = this.profileService.getProfilePublic(username);
        if ((await reponse).error == true)
            return ({404: 'user not found.'});
        return reponse;
    }

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
    
    @Post('upload/photo')
    @UseInterceptors(FileInterceptor('image'))
    async updatePhoto(@UploadedFile() file) : Promise<any>
    {
        //  Add userID validation when auth is done by JP
        const response = {
            originalame: file.originalame,
            filename: file.filename,
        };
        if (response)
        {
            this.profileService.updatePhoto(file.filename, useID);
            return response
        }
        else
        {
            return ({401: "Unauthorized"});
        }
    }

    @Post('update/username')
    async updateUsername() : Promise<any>
    {
        //  Add userID validation when auth is done by JP
        
    }
}
