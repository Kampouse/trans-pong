import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module(
{
    controllers: [ProfileController],
    providers: [ProfileService, AuthService],
    imports: [],
    exports: [ProfileService]
})
export class ProfileModule {}
