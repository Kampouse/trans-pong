import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io'

const server = new Server(3000)
async function gameSocket() {
    server.on('connection', (socket) => {
        console.log(socket.connected);
        server.send()
    })

}
gameSocket();
