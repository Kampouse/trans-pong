import { Controller } from "@nestjs/common";
import { GameRoom, GameSocketIOService, Player } from "./game.services";

@Controller()
export class GameSocketIOController {
    constructor(private gameSocketIO: GameSocketIOService){
        const server = this.gameSocketIO.getServer();
        console.log(server)
        server.on("connection", (socket) => {
            console.log("New socket: "  + socket.id);

            socket.on("disconnect", () => {
                console.log("Socket disconnected: " + socket.id)
                //do things here to remove user from a game it might be in maybe ?
                gameSocketIO.socketMap.delete(this.getUserFromSocketId(gameSocketIO.socketMap, socket))
            })

            socket.on("registerId", (user) => {
                gameSocketIO.socketMap[user.userId] = user.socket //keeping socket instance in the map so we can retrieve it later
                console.log(gameSocketIO.socketMap)
            })

            socket.on("searchGame", () => {
                var room = this.tryGetAvailableRoom(gameSocketIO.roomMap)
                if(gameSocketIO.roomMap.length == 0 || room == null){ //no room found, add new room
                    var newRoom: GameRoom = new GameRoom(new Player(this.getUserFromSocketId(gameSocketIO.socketMap, socket.id)))
                    gameSocketIO.roomMap.push(newRoom); //adds new room to list
                    socket.join(newRoom.getRoomName()); //make client socket join room
                }
                else{ //array isnt empty and there are rooms available
                    var roomName = this.gameSocketIO.makePlayerJoinRoom(new Player(this.getUserFromSocketId(gameSocketIO.socketMap, socket.id)));
                    socket.join(roomName); //all players are in the game, status is set to active
                    server.to(roomName).emit("roomIsReady"); //pass control to game execution
                }
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
    tryGetAvailableRoom(gameRoom: Array<GameRoom>) {
        for(let room of gameRoom){
            if(room.status == "waiting") //room has available slot
                return room;
        }
        return null;
    }
}