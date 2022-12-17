import { prisma } from '../main';
import {
  Controller,
  Get,
  Req,
  UseGuards,
  Redirect,
  Res,
  Post,
  Session,
  Headers,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './utils/42strategy';
import { JwtGuard, FortyTwoAuthGuard } from './utils/Guards';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
type User = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  login42: string;
  userStatus: string;
  imagePath: string;
};
type SessionUser = { [key: string]: any };
type RequestWithUser = Request & { user: User; response: any } & {
  session: { passport: { user: User } };
};
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  //verify  with :id
  @Get('verify')
  async handleLogin(@Res({ passthrough: true }) response, @Req() request: Request, @Headers() headers: Headers) {
    const sessionStore = request['sessionStore'];
    const type: SessionUser = sessionStore['sessions'];
    const groups = { ...type };
    const first = Object.values(groups)[0];
    if (!request.headers.authorization) {
      return ({ 401: 'Unauthorized' });
    }
    if (request.headers.authorization) {
      this.authService.validate_token(request.headers.authorization).then((data) => {
        if (data) {
          return ({ 200: 'ok' });
        }
        else {
          return ({ 401: 'Unauthorized' });
        }
      })
    }
    if (first !== undefined) {
      const parsed = JSON.parse(first);
      const expire = parsed['cookie']['expires'];
      const passport = parsed['passport'];
      const token = await this.authService.createToken(passport['user']);
      return { 200: 'ok', token: token };;
    }
    else {
      try {
        if (request.headers.authorization.length === 9) {
          return { 401: 'Unauthorized', status: 'Unauthorized' };
        }
        if (request.headers.authorization) {
          const decoded = await this.authService.verify2(request.headers.authorization);
          if (decoded) {
            let res = { token: request.headers.authorization, 200: 'ok' };
            headers['authorization'] = request.headers.authorization;
            return { data: res, Headers: { 'Content-Type': 'application/json' }, headers: headers };
          }
        }
        else {
          response.status(401).send({ message: 'Unauthorized' });
        }
      }
      catch {
        response.status(401).send({ message: 'Unauthorized', status: 'Unauthorized' });
      }
    }
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('42login')
  @Redirect()
  async handleLogin42(@Req() request: RequestWithUser)
  {
    if (request.user) {
     let isNewUser =   await this.authService.create(request.user);
     let   path = isNewUser ? '/profile' : '/';
      return { statCode: 302, url:  "http://localhost:5173" + path };
    }
      return { statCode: 302, url: "http://localhost:5173/Login"}
  }
  @Get('check')
  @UseGuards(JwtGuard)
  check(@Req() @Headers() headers: Headers) {
    return { hello: 'hello' };
  }
}
