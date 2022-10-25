import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy    } from  './utils/42strategy';
 import { FortyTwoAuthGuard } from './utils/Guards';
  
@Module({
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy, FortyTwoAuthGuard],

})
export class AuthModule {}
