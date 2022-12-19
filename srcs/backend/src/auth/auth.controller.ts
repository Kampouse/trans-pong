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
import { Response, Request, response } from 'express';
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
  @Get('42')
  async rah(@Req() request: Request, @Res() res) {
     console.log("rah",request.headers)
      return { message: 'ok' };
  }
  @Get('who')
  async whoAmI(@Req() request: RequestWithUser, @Res() res) {
    const sessionStore = request['sessionStore'];
    const type: SessionUser = sessionStore['sessions'];
    const groups = { ...type };
    const first = Object.values(groups)[0];
  if (first !== undefined) {
      const parsed = JSON.parse(first);
      const expire = parsed['cookie']['expires'];
      const passport = parsed['passport'];
      const token = await this.authService.createToken(passport['user']);
     console.log(request.res.getHeader('Set-Cookie'))
    res.cookie('token',token,{httpOnly:false}).send();
    }
  }
  //verify  with :id
  @Get('verify')
  async handleLogin(@Res({ passthrough: true }) response, @Req() request, @Headers() headers: Headers) {
    console.log(request.cookies['token'])
    const sessionStore = request['sessionStore'];
    const type: SessionUser = sessionStore['sessions'];
    const groups = { ...type };
     console.log(groups)
    const first = Object.values(groups)[0];
      /*
    if (!request.headers.authorization) {
      response.status(401)
    }
*/
      if (first !== undefined) {
      const parsed = JSON.parse(first);
      const expire = parsed['cookie']['expires'];
      const passport = parsed['passport'];
    }
    else {
      try {
        if (request.headers.authorization.length === 9) {
          response.status(401)
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
          response.status(401).send({ message: 'Unauthorized', status: '401' });
        }
      }
      catch {
          response.status(401).send({ message: 'Unauthorized', status: '401' });
 //       response.status(401).send({ message: 'Unauthorized', status: 'Unauthorized' });
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
