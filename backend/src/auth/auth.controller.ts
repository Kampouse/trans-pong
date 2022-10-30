import { Controller, Get, Req, UseGuards,Request, Redirect ,Res, Post} from '@nestjs/common';
import { response, Express } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './utils/42strategy';
import { GoogleAuthGuard,FortyTwoAuthGuard, FortyTwoRedirect } from './utils/Guards';
// import Redirect from 'express-redirect';
import { PassportModule, PassportSerializer} from "@nestjs/passport";
import { reduce } from 'rxjs';
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
@Redirect('http://localhost:5173')
handleLogin42(@Req()  request:RequestWithUser,response:Express.Response)  {
    return { request: request.user };
  }

@Get('redirect')
@UseGuards(GoogleAuthGuard)
 handleRedirect () {
    return { message: 'Redirect' };
  }
}
   // handle  the post from the login page  
