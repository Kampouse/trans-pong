import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'

const server = new Server(3000)
async function gameSocket() {
    server.on('connection', (socket) => {
        console.log(socket.connected);
        server.send()
    })

}
gameSocket();
