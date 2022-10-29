import { Controller, Get, Req, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard,FortyTwoAuthGuard } from './utils/Guards';

import { PassportSerializer} from "@nestjs/passport";
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
//use the @Req decorator to access the request object
 
handleLogin42(@Req()  request:Request) {
  console.log(request);
    //
  // redirect to  to normal login page
    
    return { message: 'Login' };
  }

@Get('redirect')
@UseGuards(GoogleAuthGuard)
 handleRedirect () {
    return { message: 'Redirect' };
  }
}
