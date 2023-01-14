import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { IsNumber } from 'class-validator';
import { JwtGuard } from 'src/auth/utils/Guards';
import { get } from 'http';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // check if user logged in and get user profile
  @UseGuards(JwtGuard)
  @Get('/profile')
  async profile(@Req() req: Request) {
    const user: any = req.user;
    const userD: User = await this.usersService.findOneById(user.userID);

    return userD;
  }
}

