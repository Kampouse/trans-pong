import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthController, ProfileController],
  providers: [AppService, AuthService, ProfileService],
})
export class AppModule {}
