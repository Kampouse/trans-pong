import { Controller, Get, Header, Param} from "@nestjs/common";
import { ProfileService } from "./profile.service"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {}

    @Get(':username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getProfile(@Param('username') username: string) : Promise<any>
    {
        const reponse = this.profileService.getProfile(username);
        if ((await reponse).error == true)
            return ({404: 'user not found.'});
        return reponse;
    }
}
