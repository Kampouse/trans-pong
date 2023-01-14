import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { UsersService } from './users.service';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class UsersGateway {
  constructor(private usersService: UsersService) {}

  @WebSocketServer()
  server: Server;
}
