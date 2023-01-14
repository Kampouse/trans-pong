import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProfileService } from './profile.service';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ProfileGateway {
  constructor(private profileService: ProfileService) {}
  @WebSocketServer()
  server: Server;
}
