import { Controller } from "@nestjs/common";
import { GameSocketIOService } from "./game.services";

@Controller()
export class GameSocketIOController {
    constructor(private gameSocketIO: GameSocketIOService){
        const server = this.gameSocketIO.getServer();
        console.log(server)
        server.on("connection", (socket) => {
            console.log("New socket: "  + socket.id);

            socket.on("disconnect", () => {
                console.log("Socket disconnected: " + socket.id)
            })

            socket.on("registerId", (user) => {
                gameSocketIO.socketMap[user.userId] = user.socketId
                console.log(gameSocketIO.socketMap)
            })
        })

        server.on("disconnect", () => {
            console.log("server shutted down")
        })
    }
    
    getUserFromSocketId(map, searchValue) {
    for (let [key, value] of map.entries()) {
        if (value === searchValue)
        return key;
    }
}
}