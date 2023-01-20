import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, AuthService, JwtService],
  imports: [HttpModule],
  exports: [ProfileService],
})
export class ProfileModule {}
