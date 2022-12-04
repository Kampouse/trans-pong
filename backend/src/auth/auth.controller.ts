import { prisma } from './../main';
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
import {Response,Request } from 'express';
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
};
type SessionUser = { [key: string]: any };
type RequestWithUser = Request & { user: User; response: any } & {
  session: { passport: { user: User } };
};
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //verify  with :id
  @Get('verify')
  async handleLogin(  @Res({ passthrough: true }) response, @Req() request: Request, @Headers() headers: Headers) {
    const sessionStore = request['sessionStore'];
    const type: SessionUser = sessionStore['sessions'];
    const groups = { ...type };
    const first = Object.values(groups)[0];
    if(request.headers.authorization  !== undefined){
        this.authService.validate_token(request.headers.authorization).then((data) => { 
          if(data){
            return({200: 'ok'});
          }
          else{
            return({401: 'Unauthorized'});
          }
        })
    }
    if (first !== undefined) {
      const parsed = JSON.parse(first);
      const expire = parsed['cookie']['expires'];
      const passport = parsed['passport'];
       const token = await this.authService.createToken( passport['user']);
        console.log(token);
        return response.status(200).send(  {token: token});
    }
    else {
        try{
        const  decoded = await this.authService.verify2(request.headers.authorization);
        if(decoded){
             console.log('decoded', decoded);
            return({token: request.headers.authorization});  
            
        }
        else{ 
           console.log('not valid');
            response.status(401).send({message: 'Unauthorized'});
        }
      }
      catch{
         console.log('error');
         response.status(401).send({message: 'Unauthorized'});
      }
    }
  }
   
  @UseGuards(FortyTwoAuthGuard)
  @Get('42login')
  @Redirect()
  handleLogin42(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.user) {
      const url = 'http://localhost:5173/Who';
      this.authService.exists(request.user.username).then((data) => {
        if (data == null) {
          this.authService.create(request.user);
        }
      });
      return { statCode: 302, url: url};
    }
    if (!request.user) {
      const url = 'http://localhost:5173' + '/Login';
      return {
        statCode: 302,
        url: url
      };
    }
  }
  @Get('check')
  @UseGuards(JwtGuard)
  check(@Req() @Headers() headers: Headers) {
    return { hello: 'hello' };
  }
}
