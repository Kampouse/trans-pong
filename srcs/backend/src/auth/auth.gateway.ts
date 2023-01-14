import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class AuthGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger;

  constructor(private authService: AuthService) {
    this.logger = new Logger('AuthGateway');
  }

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    this.server.on('connection', (socket) => {
      this.logger.log(`Client Init: ${socket.id}`);
    });
  }

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    await this.authService.addToConnection(client, this.server);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    await this.authService.removeFromConnection(client, this.server);
  }

  @SubscribeMessage('userUpdate')
  emitUpdate() {
    this.server.emit('onUserChange');
  }

  @SubscribeMessage('userLogout')
  userLogout() {
    this.server.emit('onUserChange');
  }
}
