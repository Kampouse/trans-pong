import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Get('verify')
    async verifyLogin()
    {
        return ({
            "response" : "yes"
        })
    }
}
