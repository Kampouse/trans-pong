import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GameGateway } from './game/game.gateway';
import { GameSocketIOController } from './game/game.controller';
import { GameSocketIOModule } from './game/game.module';
import { GameSocketIOService } from './game/game.services';

@Module({
  imports: 
    [
    AuthModule,
    MulterModule.register({dest: '../srcs/public'})
    ],
  controllers: [AuthController, ProfileController, GameSocketIOController],
  providers: [AppService, AuthService, ProfileService, GameGateway, GameSocketIOService],
})
export class AppModule {}
