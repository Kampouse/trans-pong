import { Controller, Get, Req, Redirect, Res, Param } from "@nestjs/common";
import { GameRoom, GameSocketIOService, Player } from "./game.services";
import { RequestWithUser } from "src/dtos/auth.dtos";
import { prisma } from 'src/main'

@Controller()
export class GameSocketIOController {
    constructor(private gameSocketIO: GameSocketIOService) {
        const server = this.gameSocketIO.getServer();

        server.on("connection", (socket) => {
            console.log("New socket: " + socket.id);

            socket.on("disconnect", () => {
                console.log("Socket disconnected: " + socket.id)
                //do things here to remove user from a game it might be in maybe ?
                delete gameSocketIO.socketMap[socket.id]
            })

            socket.on("registerId", (user) => {
                gameSocketIO.socketMap[user.socket] = user.userId//keeping socket instance in the map so we can retrieve it later
                //console.log(gameSocketIO.socketMap)
            })

            socket.on("searchGame", async () => {
                var room = this.tryGetAvailableRoom(gameSocketIO.roomMap)
                //console.log(gameSocketIO.roomMap.size)
                if (gameSocketIO.roomMap.size == 0 || room == null) { //no room found, add new room
                    var newRoom: GameRoom = new GameRoom(new Player(this.gameSocketIO.socketMap[socket.id], socket), gameSocketIO.getServer())
                    gameSocketIO.roomMap.set(newRoom.getRoomName(), newRoom) //adds new room to list
                    socket.join(newRoom.getRoomName()); //make client socket join room
                }
                else { //array isnt empty and there are rooms available
                    var roomName = await this.gameSocketIO.makePlayerJoinRoom(new Player(this.gameSocketIO.socketMap[socket.id], socket));
                    if (roomName == "") {
                        socket.emit("noSuitableRoomFound");
                    }
                    else {
                        socket.join(roomName); //all players are in the game, status is set to active
                        server.to(roomName).emit("roomIsReady", roomName); //pass control to game execution
                    }
                }
            })
            socket.on("socketIsConnected", () => {
                socket.emit("ack", socket.id)
            })
            socket.on(("joinedGame"), () => {
                console.log(`Socket ${socket.id} landed on the game`)
            })
            socket.on("spectateGame", (roomID) => {
                console.log(roomID);
                socket.join(roomID);
                socket.emit("roomIsReady")
            })
            socket.on("ping", async (userid) => {
                var date = new Date();
                if (userid != "" && userid != null) {
                    try {
                    const user = await prisma.user.findUnique({ where: { userID: userid } })
                    if (user && user.userStatus == "playing")
                        await prisma.user.update({
                            where: { userID: userid }, data: {
                                userStatus: "playing",
                                activeAt: date.toISOString(),
                            }
                        })
                    
                    else if (user && user.userStatus == "online")
                        await prisma.user.update({
                            where: { userID: userid }, data: {
                                userStatus: "online",
                                activeAt: date.toISOString(),
                            }
                        })
                    else if (user && user.userStatus == "offline")
                        await prisma.user.update({
                            where: { userID: userid }, data: {
                                userStatus: "online",
                                activeAt: date.toISOString(),
                            }
                        })
                    }
                    catch{
                        
                    }
                }
            })
        })

        server.on("disconnect", () => {
            console.log("server shutted down")
        })
    }

    getUserFromSocketId(map, searchValue) {
        for (let [key, value] of map.entries()) {
            if (value === searchValue) {
                return key;
            }
            console.log("user from socket id not found")
        }
    }
    tryGetAvailableRoom(gameRoom: Map<string, GameRoom>) {
        for (let room of gameRoom) {
            if (room[1].status == "waiting") //room has available slot
                return room[1];
        }
        return null;
    }


    @Get('game/:id')
    printId(@Param('id') id: string) {
        console.log(`accessing game ${id}`);
    }
}