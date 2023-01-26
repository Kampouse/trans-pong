import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ProfileController } from './profile.controller';
import { ProfileGateway } from './profile.gateway';
import { ProfileService } from './profile.service';


@Module(
{
    controllers: [ProfileController],
    providers: [ProfileService, ProfileGateway, AuthService, JwtService],
    //imports: [HttpModule],
    exports: [ProfileService],
})
export class ProfileModule {}
