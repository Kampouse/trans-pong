import { prisma } from '../main';
import { Controller, Get,Req,UseGuards, Redirect, Res} from '@nestjs/common';
import { Request  } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './utils/42strategy';
import { JwtGuard, FortyTwoAuthGuard } from './utils/Guards';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

//  A user object expected in the request ?
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

//  Session user to identify a client ?
type SessionUser = { [key: string]: any };

//  This is a request type expected from the front end
type RequestWithUser = Request & { user: User; response: any } & {
  session: { passport: { user: User } };
};

@Controller('auth')
export class AuthController
{
  constructor(private readonly authService: AuthService) {}

  @Get('42')
  async rah(@Req() request: Request)
  {
    // base example on how to see where the cookie is stored on the client 
    console.log("cookie ->>", request.headers['cookie'])
    return { message: 'ok' };
  }

  @Get('who')
  async whoAmI(@Req() request: RequestWithUser, @Res() res)
  {
    const sessionStore = request['sessionStore'];
    const type: SessionUser = sessionStore['sessions'];

    //  Not sure here what groups and first is for
    const groups = { ...type };

    //  First is the user tokken info the first time he log?
    const first = Object.values(groups)[0];

    console.log("cookie ->>", request.headers['cookie'])

    // If first (what is first) exist
    // parse => get the JSON parsed, get the passport and the tokken
    // and create the cookie.
    if (first !== undefined)
    {
      const parsed = JSON.parse(first);
      const passport = parsed['passport'];
      const token = await this.authService.createToken(passport['user']);
      res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true }).send();
    }
    else if (request.headers['cookie'])
    {
        // TODO: verify jwt is valid age ... otherwise gen a new one
        res.status(200).send({ message: 'ok', status: '200' });
    }
    else
    {
      res.status(401).send({ message: 'Unauthorized', status: '401' });
    }
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('42login')
  @Redirect()
  async handleLogin42(@Req() request: RequestWithUser)
  {
    //  1) If the user dosen't exist, create one
    //  2) Redirect path sent in the response
    if (request.user)
    {
      let isNewUser = await this.authService.create(request.user);
      let path = isNewUser ? '/profile' : '/';
      return { statCode: 302, url: "http://localhost:5173" + path };
    }
    return { statCode: 302, url: "http://localhost:5173/Login" }
  }
}
