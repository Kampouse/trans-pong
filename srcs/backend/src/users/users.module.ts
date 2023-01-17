import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersGateway } from './users.gateway';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UsersController],
  providers: [UsersGateway, UsersService],
  imports: [HttpModule],
  exports: [UsersService],
})
export class UsersModule {}
