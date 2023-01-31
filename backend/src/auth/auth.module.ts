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
  JwtGuard,
} from './utils/Guards';
import { ProfileModule } from 'src/profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { AuthGateway } from './auth.gateway';
import { jwtConstants } from './constants/constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:
    [
      ProfileModule,
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      })
    ],
  providers:
    [
    AuthService,
    JwtStrategy,
    FortyTwoStrategy,
    SessionSerializer,
    AuthGateway
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
