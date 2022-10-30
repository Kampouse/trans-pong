import { Controller, Get, Req, UseGuards, Redirect ,Res, Post,Response} from '@nestjs/common';
import { response, Express, Request,  } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './utils/42strategy';
import { GoogleAuthGuard,FortyTwoAuthGuard, FortyTwoRedirect } from './utils/Guards';
// import Redirect from 'express-redirect';
import { PassportModule, PassportSerializer} from "@nestjs/passport";
import cookieParser from 'cookie-parser';
// create a type of request with the request object 
type  User =  {
    id: string;
    username: string;
    displayName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}
 //create a type for the cookie 

type RequestWithUser = Request & { user: User ,response : any }  & { session: { passport: { user: User } } };
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Get('login')
@UseGuards(GoogleAuthGuard)
handleLogin() {
    console.log('handleLogin');
    //
      
    return { message: 'Login' };
  }
@UseGuards(FortyTwoAuthGuard)
@Get('42login')
@Get('redirect')
@Redirect()
handleLogin42(@Req()  request:RequestWithUser,@Res({ passthrough: true }) response: Response) {  
    if(request.user){
      const url = "http://localhost:5173" + "/Profile/" + request.user.username  ; 
      // add   user to  request body 
      request.header['user'] = request.user;
      return {statCode: 302, url: url, message: 'Login42' };
    }
    if(!request.user){
      const url = "http://localhost:5173" + "/Login";
      return {statCode: 302, url: url, cookies: { "hello" : "hello" },Headers : { "hello" : "hello" }, message: 'Login42' };
    }
    
  console.log(request);
 };


@Get('redirect')
// pass in the redirect url as a query parameter
 
 handleRedirect (request:Request,response:Express.Response)  {
    request.cookies['payload'] =  "hello world";
    return { message: 'Redirect' };
  }
}
   // handle  the post from the login page  
