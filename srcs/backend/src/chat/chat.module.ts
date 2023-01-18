import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/models/users/users.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ChatController],
  providers: [ChatGateway,ChatService],//import my gateway from gateway.ts
})
export class ChatModule {}