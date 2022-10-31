import { Controller, Get, Req, UseGuards, Redirect ,Res, Post,Response, Session, Headers} from '@nestjs/common';
import { response, Express, Request,  } from 'express';
import { request } from 'http';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './utils/42strategy';
import { GoogleAuthGuard,FortyTwoAuthGuard, FortyTwoRedirect } from './utils/Guards';
// import Redirect from 'express-redirect';
// create a type of request with the request object 
type  User =  {
    id: string;
    username: string;
    displayName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}
 // type that is oject of key value pairs of string and any type
type  SessionUser = { [key: string]: any };
 //create a type for the cookie 

type RequestWithUser = Request & { user: User ,response : any }  & { session: { passport: { user: User } } };
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Get('login')
handleLogin(@Req() request : Request , @Headers () headers:Headers) {
   var sessionStore = request['sessionStore'];
    let type: SessionUser =  sessionStore['sessions'];
    const groups = {...type} // remove null object for test comparison
     
    // get the first value of the object
     
    const first = Object.values(groups)[0];
      
    // verify the timestamp of the object 
     
    // JSON.parse the first value of the object
      if(first !== undefined){

        const parsed = JSON.parse(first); // remove null object for test comparison
        const expire = parsed['cookie']['expires']; 
        const passport = parsed['passport']; // remove null object for test comparison
        if(expire < Date.now()){
           return {};
         } else {
            return { user : passport['user']['displayName'] };
         }
      }
     
    return { };
  }
@UseGuards(FortyTwoAuthGuard)
@Get('42login')
@Redirect()
handleLogin42(@Req()  request:RequestWithUser,@Res({ passthrough: true }) response: Response,@Session() session: any ,@Headers() head: Headers)  {  
    if(request.user){
      const url = "http://localhost:5173/"  ; 
    const rawHeaders = response.headers;
      return {statCode: 302, url: url, message: 'Login42' };
    }
    if(!request.user){
      const url = "http://localhost:5173" + "/Login";
      return {statCode: 302, url: url, cookies: { "hello" : "hello" },Headers : { "hello" : "hello" }, message: 'Login42' };
    }
    
 };


@Get('redirect')
// pass in the redirect url as a query parameter
 
 handleRedirect (request:Request,response:Express.Response)  {
    request.cookies['payload'] =  "hello world";
    return { message: 'Redirect' };
  }
}
   // handle  the post from the login page  
