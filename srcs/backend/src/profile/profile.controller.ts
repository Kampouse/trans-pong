import { Controller, Get, Header, Param} from "@nestjs/common";
import { ProfileResponse } from "./profile.model";
import { ProfileService } from "./profile.service"

@Controller('profile')
export class AuthController {
    constructor(private readonly profileService : ProfileService) {}

    @Get(':username')
    @Header('Content-type', 'application/json; charset=utf-8')
    async getProfile(@Param('username') username: string) : Promise<ProfileResponse>
    {
        return this.profileService.getProfile(username);
    }
}
