import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { HttpModule } from '@nestjs/axios';
import { ProfileGateway } from './profile.gateway';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileGateway, AuthService, JwtService],
  imports: [HttpModule],
  exports: [ProfileService],
})
export class ProfileModule {}
