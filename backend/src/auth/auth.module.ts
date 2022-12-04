import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './utils/42strategy';
import { JwtModule } from '@nestjs/jwt';
import {
  GoogleAuthGuard,
  FortyTwoAuthGuard,
  SessionSerializer,
  LoginGuard,
} from './utils/Guards';

@Module({
  imports: [
    JwtModule.register({
      secret: "this is a secret",
      signOptions: { expiresIn: '60s' },
    }),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    GoogleAuthGuard,
    FortyTwoStrategy,
    FortyTwoAuthGuard,
    SessionSerializer,
    LoginGuard,
  ],
})
export class AuthModule {}
