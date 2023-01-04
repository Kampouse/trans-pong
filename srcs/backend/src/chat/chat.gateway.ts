import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { isArgumentsObject } from 'util/types';

@WebSocketGateway()
export class ChatGateway() implements OnGatewayConnection, OnGateWayDisconnect 
{
    @WebSocketServer()
    server: Server;

    handleConnection(client: any, ...args: any[]){
        console.log('Client connected');
    }

    handleDisconnect(client: any){
        console.log('Client disconnected');
    }

    sendMessage(client: any, message: string)
    {
        this.server.emit('message', message);
    }

    joinRoom(client: any, room: string)
    {
        client.join(room);
    }
}