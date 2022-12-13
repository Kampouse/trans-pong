import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { prisma } from './../main';
import { PrismaClient } from "@prisma/client";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Get('verify')
    async getAuth()
    {
        PrismaClient
        return ({
            "response" : "yes"
        })
    }
}
