import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard,FortyTwoAuthGuard } from './utils/Guards';

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
handleLogin42() {
    console.log('handleLogin');
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









