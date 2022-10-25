import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@UseGuards(FortyTwoAuthGuard)
@Get('login')
handleLogin() {
    return { message: 'Login' };
  }

@UseGuards(FortyTwoAuthGuard)
@Get('redirect')
 handleRedirect () {
    return { message: 'Redirect' };
  }
}









