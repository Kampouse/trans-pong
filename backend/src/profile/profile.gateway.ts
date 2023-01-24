import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProfileService } from './profile.service';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ProfileGateway {
  constructor(private usersService: ProfileService) {}

  @WebSocketServer()
  server: Server;
}
