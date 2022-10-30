import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Google, FortyTwoStrategy   } from  './utils/42strategy';
 import { GoogleAuthGuard, FortyTwoAuthGuard,SessionSerializer,FortyTwoRedirect} from './utils/Guards';
  
@Module({
  controllers: [AuthController],
  providers: [AuthService, Google,GoogleAuthGuard, FortyTwoStrategy, FortyTwoAuthGuard,SessionSerializer,FortyTwoRedirect],
})
export class AuthModule {}