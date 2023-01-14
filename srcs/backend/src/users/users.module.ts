import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersGateway } from './users.gateway';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersGateway, UsersService],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
