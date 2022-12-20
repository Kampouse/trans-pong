import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MulterModule.register(
    {
        dest: '../frontend/public'
    })
            ],
  controllers: [AuthController, ProfileController],
  providers: [AppService, AuthService, ProfileService, AuthModule, JwtService],
})
export class AppModule {}
