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
import { ConfigModule } from '@nestjs/config';



@Module(
    {
        //  Module imports
        imports:[
            ConfigModule.forRoot(),
            AuthModule,
    MulterModule.register({ dest: '../frontend/public' })],
            
        //  Controllers imports
        controllers:[
            AuthController,
            ProfileController],

        //  Services imports
        providers:[
            AuthService,
            ProfileService,
            AuthService,
            JwtService,
            AppService,]
})
export class AppModule {}
