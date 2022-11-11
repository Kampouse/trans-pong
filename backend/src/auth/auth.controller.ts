import { Controller, Get, Req, UseGuards, Redirect ,Res, Post,Response, Session, Headers} from '@nestjs/common';
import { response, Express, Request,  } from 'express';
import { request } from 'http';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './utils/42strategy';
import { GoogleAuthGuard,FortyTwoAuthGuard, LoginGuard } from './utils/Guards';
import { UpdateAuthDto } from './dto/update-auth.dto'
import { CreateAuthDto } from './dto/create-auth.dto'
type  User =  {
    id: string;
    username: string;
    displayName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}
type  SessionUser = { [key: string]: any };
type RequestWithUser = Request & { user: User ,response : any }  & { session: { passport: { user: User } } };
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Get('verify')
handleLogin(@Req() request : Request , @Headers () headers:Headers) {
    let sessionStore = request['sessionStore'];
    let type: SessionUser =  sessionStore['sessions'];
    const groups = {...type} 
    const first = Object.values(groups)[0];
      if(first !== undefined){
        const parsed = JSON.parse(first); 
        const expire = parsed['cookie']['expires']; 
        const passport = parsed['passport']; 
        if(expire < Date.now()){
           return {};
         } else {

             // ho
           
            return { user : passport['user']['displayName'] };
         }
      }
    return { user : "no user" };
  }

@UseGuards(FortyTwoAuthGuard)
@Get('42login')
@Redirect()
handleLogin42(@Req()  request:RequestWithUser,@Res({ passthrough: true }) response: Response,@Session() session: any ,@Headers() head: Headers)  {  
    if(request.user){
      const url = "http://localhost:5173/Profile"  ; 
    const rawHeaders = response.headers;
      return {statCode: 302, url: url, message: 'Login42' };
    }
    if(!request.user){
      const url = "http://localhost:5173" + "/Login";
      return {statCode: 302, url: url, cookies: { "hello" : "hello" },Headers : { "hello" : "hello" }, message: 'Login42' };
    }
    
 };
@Get('check')
@UseGuards(LoginGuard)
check(@Req() request : Request , @Headers () headers:Headers) {
    return { hello : "hello" };
  }


  

}
