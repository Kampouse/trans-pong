import { Controller, Get, Req, Redirect, Res, Param } from "@nestjs/common";
import { GameRoom, GameSocketIOService, Player } from "./game.services";
import { RequestWithUser } from "src/dtos/auth.dtos";

@Controller()
export class GameSocketIOController {
    constructor(private gameSocketIO: GameSocketIOService){
        const server = this.gameSocketIO.getServer();
        //console.log(server)
        server.on("connection", (socket) => {
            console.log("New socket: "  + socket.id);

            socket.on("disconnect", () => {
                console.log("Socket disconnected: " + socket.id)
                //do things here to remove user from a game it might be in maybe ?
                gameSocketIO.socketMap.delete(socket.id)
            })

            socket.on("registerId", (user) => {
                gameSocketIO.socketMap[user.socket] = user.userId//keeping socket instance in the map so we can retrieve it later
                console.log(gameSocketIO.socketMap)
                //this.getUserFromSocketId(this.gameSocketIO.socketMap, user.userId)
                //console.log(this.getUserFromSocketId(this.gameSocketIO.socketMap, socket.id))
            })

            socket.on("searchGame", () => {
                var room = this.tryGetAvailableRoom(gameSocketIO.roomMap)
                //console.log(gameSocketIO.roomMap.size)
                if(gameSocketIO.roomMap.size == 0 || room == null){ //no room found, add new room
                    var newRoom: GameRoom = new GameRoom(new Player(this.gameSocketIO.socketMap[socket.id], socket), gameSocketIO.getServer())
                    gameSocketIO.roomMap.set(newRoom.getRoomName(), newRoom) //adds new room to list
                    socket.join(newRoom.getRoomName()); //make client socket join room
                    //console.log(gameSocketIO.roomMap)
                }
                else{ //array isnt empty and there are rooms available
                    var roomName = this.gameSocketIO.makePlayerJoinRoom(new Player(this.gameSocketIO.socketMap[socket.id], socket));
                    socket.join(roomName); //all players are in the game, status is set to active
                    server.to(roomName).emit("roomIsReady", roomName); //pass control to game execution
                }
            })
            socket.on("socketIsConnected", () => {
                socket.emit("ack", socket.id)
            })
            socket.on(("joinedGame"), () => {
                console.log(`Socket ${socket.id} landed on the game`)
            })
        })

        server.on("disconnect", () => {
            console.log("server shutted down")
        })
    }
    
    getUserFromSocketId(map, searchValue) {
        for (let [key, value] of map.entries()) {
            if (value === searchValue){
                //console.log(key)
                return key;
            }
            console.log("user from socket id not found")
        }
    }
    tryGetAvailableRoom(gameRoom: Map<string, GameRoom>) {
        for(let room of gameRoom){
            if(room[1].status == "waiting") //room has available slot
                return room[1];
        }
        return null;
    }


    @Get('game/:id')
    printId(@Param('id') id: string){
        console.log(`accessing game ${id}`);
    }
}