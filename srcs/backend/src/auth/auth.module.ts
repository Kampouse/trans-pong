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

@Module({
  imports: [
    ProfileModule,
    PassportModule,
    JwtModule.register({
      secret: 'this is a secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AuthGateway],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
