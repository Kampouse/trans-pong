import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    private logger: Logger = new Logger('GameGateway');

    //  WebSocketGateway initialisation method
    afterInit(server: Server) {
        this.logger.log('Initialized!');
    }

    //  WebSocketGateway handleConnection method
    handleConnection(client: Socket, ...args: any[])
    {
        this.logger.log(`Client connected:          ${client.id}.`);
    }

    //  WebSocketGateway disconnect method
    handleDisconnect(client: Socket)
    {
        this.logger.log(`Client disconnected:       ${client.id}.`);
    }


    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): WsResponse<string> {
        return {event: 'msgToClient', data: "Hello World!"};
    }
}
