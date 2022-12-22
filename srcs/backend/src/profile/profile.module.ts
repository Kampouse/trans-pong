import { Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthModule } from 'src/auth/auth.module';


@Module(
{
    imports: [AuthModule, AppModule], 
    controllers: [AppController],
    providers: [AppService]
})
export class ProfileModule {}
