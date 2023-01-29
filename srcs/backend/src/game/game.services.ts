import { Injectable } from "@nestjs/common";
import { GameUpdate, UpdateProps, UpdateProp } from './object.game'
import * as io from 'socket.io'
import { prisma } from 'src/main';
import { AnymatchFn } from "vite";


export class Player {
    private userId: number
    private points: number
    private socket: io.Socket; //for id
    private actions: UpdateProp = { keyActions: { up: false, down: false } };
    public status: string

    constructor(userId, socket: io.Socket) {
        this.userId = userId;
        this.points = 0;
        this.status = "waiting";
        this.socket = socket;
        socket.on("updatePlayerPosition", (keyActions) => {
            if (keyActions.direction == "ArrowUp") {
                this.setKeyArrowUp();
            }
            if (keyActions.direction == "ArrowDown") {
                this.setKeyArrowDown();
            }
        })
        socket.on("stopUpdatePlayerPosition", () => {
            this.unsetKeyArrowDown();
            this.unsetKeyArrowUp();
        })
        socket.on("playerReady", () => {
            console.log("this player is ready");
            this.status = "ready";
        })
        socket.on("disconnect", () => {
            this.status = "disconnected"
        })
        socket.on("giveup", () => {
            this.status = "disconnected"
        })
    }
    public setKeyArrowUp() {
        this.actions.keyActions.up = true;
    }
    public unsetKeyArrowUp() {
        this.actions.keyActions.up = false;
    }
    public setKeyArrowDown() {
        this.actions.keyActions.down = true;
    }
    public unsetKeyArrowDown() {
        this.actions.keyActions.down = false;
    }

    public getKeyActionCurrentState(): UpdateProp {
        return this.actions;
    }
    public getUserId() {
        return this.userId;
    }
    public isSocketDisconnected() {
        if (this.status == "disconnected")
            return true
        return false
    }

}

export class GameRoom {
    private roomName: string
    private player1: Player
    private player2: Player
    private updateInterval;
    private tempWaitForPlayerReadyInterval
    private handleSocketDisconnect
    private gameUpdateObject: GameUpdate
    private server: io.Server

    public status: string


    constructor(player1: Player, server: io.Server) {
        this.roomName = this.makeid(10); //default
        this.player1 = player1;
        this.status = "waiting" //default status
        this.gameUpdateObject = new GameUpdate()
        this.updateInterval = null;
        this.server = server

        console.log(`Lobby ${this.roomName} instanciated, waiting for second player`)
        this.tempWaitForPlayerReadyInterval = setInterval(() => {
            if (this.player1.status == "ready" && this.player2.status == "ready") {
                clearInterval(this.tempWaitForPlayerReadyInterval);
                this.startGameUpdateInterval(this.server)
            }
            if (this.player1.isSocketDisconnected()){
                this.status = "finished"
            }
        }, 500) //every 500 milliseconds the interval will check if players are ready
    }

    public makeid(length): string { //generating random room id's
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async setPlayer1() { //set Player1 info into game update object
        try {
            var user = await prisma.user.findUnique({ where: { userID: this.player1.getUserId() } })
            this.gameUpdateObject.leftPlayer.playerPhoto = user.imagePath
            this.gameUpdateObject.leftPlayer.playerUser = user.login42
        }
        catch (e) {
            console.log(e)
        }
    }

    async setPlayer2(player: Player) {
        if (this.player2 == null) { //prevent possible reassignments from players who might try to trash the room
            this.player2 = player;
            try {
                var user = await prisma.user.findUnique({ where: { userID: player.getUserId() } })
                console.log(user)
                this.gameUpdateObject.rightPlayer.playerPhoto = user.imagePath
                this.gameUpdateObject.rightPlayer.playerUser = user.login42
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    public getPlayer1Id() {
        return this.player1.getUserId()
    }
    public getPlayer2Id() {
        return this.player2.getUserId();
    }
    public getRoomName() {
        return this.roomName;
    }
    public startGameUpdateInterval(server: io.Server) {
        this.handleSocketDisconnect = setInterval(async () => { //this interval checks socket status if disconnected, if it is we need to pause the game for 10 seconds
            if (this.player1.isSocketDisconnected() == true || this.player2.isSocketDisconnected() == true) {
                clearInterval(this.updateInterval);
                clearInterval(this.handleSocketDisconnect);
                let timeoutReconnection = setTimeout(async () => {
                    this.status = "finished"
                    clearInterval(checkForReconnection)
                    //do things to end game and assign player who didnt disconnect
                    await prisma.user.update({
                        where: { userID: this.getPlayer1Id() },
                        data: {
                            userStatus: "online"
                        }
                    });
                    await prisma.user.update({
                        where: { userID: this.getPlayer2Id() },
                        data: {
                            userStatus: "online"
                        }
                    });
                    await prisma.game.update({
                        where: { gameRoomID: this.getRoomName() },
                        data: {
                            leftPlayerScore: this.gameUpdateObject.leftPlayer.playerScore,
                            rightPlayerScore: this.gameUpdateObject.rightPlayer.playerScore,
                            active: false,
                            winner: "No winner"
                        }
                    });
                    server.to(this.getRoomName()).emit("leaveRoom", this.getRoomName()); //frontend to handle game end
                }, 3000) //one of our players did not reconnect in 10 seconds, end the game
                let checkForReconnection = setInterval(() => {
                    if (this.player1.isSocketDisconnected() == false && this.player2.isSocketDisconnected() == false) {
                        clearTimeout(timeoutReconnection)
                        clearInterval(checkForReconnection)
                        this.startGameUpdateInterval(server)
                    }
                }, 100)
            }
        }, 100) //lets see if we can deal with 100 millisecs

        this.updateInterval = setInterval(async () => { //game update interval
            this.gameUpdateObject.update({ keyActionsPlayer1: this.player1.getKeyActionCurrentState(), keyActionsPlayer2: this.player2.getKeyActionCurrentState() })
            this.gameUpdateObject.updateGameUpdateDto(); //should change the object properties hopefully
            //console.log(this.gameUpdateObject.updateGame);
            if (this.gameUpdateObject.leftPlayer.playerScore == 5 || this.gameUpdateObject.rightPlayer.playerScore == 5) {
                //posting data stuff maybe ?
                this.status = "finished"
                this.gameUpdateObject.updateGame.gameOver = true;
                this.gameUpdateObject.updateGame.winner = this.gameUpdateObject.leftPlayer.playerScore == 5 ? this.gameUpdateObject.leftPlayer.playerUser : this.gameUpdateObject.rightPlayer.playerUser;
                clearInterval(this.updateInterval);
                clearInterval(this.handleSocketDisconnect);
                server.to(this.getRoomName()).emit("gameUpdate", this.gameUpdateObject.updateGame)
                server.to(this.getRoomName()).emit("leaveRoom", this.getRoomName()); //send event to make client sockets leave room as security measure
                await prisma.game.update({
                    where: { gameRoomID: this.getRoomName() },
                    data: {
                        leftPlayerScore: this.gameUpdateObject.leftPlayer.playerScore,
                        rightPlayerScore: this.gameUpdateObject.rightPlayer.playerScore,
                        active: false,
                        winner: this.gameUpdateObject.updateGame.winner
                    }
                });
                await prisma.user.update({
                    where: { userID: this.getPlayer1Id() },
                    data: {
                        userStatus: "online"
                    }
                });
                await prisma.user.update({
                    where: { userID: this.getPlayer2Id() },
                    data: {
                        userStatus: "online"
                    }
                });
            }
            server.to(this.getRoomName()).emit("gameUpdate", this.gameUpdateObject.updateGame)
        }, (1 / 60) * 1000) //60 fps
    }
    public getPlayer1Status() {
        return this.player1.status;
    }
    public getPlayer2Status() {
        return this.player2.status;
    }
}

@Injectable()
export class GameSocketIOService {

    private server: io.Server
    private gameRoomUpdateInterval
    public socketMap: Map<string, string> //socketid, userid, maps socket id's to user id's for easy retrieval
    public sessionMap: Map<any, any>
    public roomMap: Map<string, GameRoom>


    constructor() {
        this.server = new io.Server(3001, {
            cors: {
                origin: function (origin, callback) {
                    //console.log(origin)
                    callback(null, true)
                },
                methods: ["GET", "POST", "PUT", "DELETE"]
            }
        });
        this.socketMap = new Map<string, string> //userid, socketid
        //this.roomMap = new Array<GameRoom>
        this.roomMap = new Map<string, GameRoom>
        this.sessionMap = new Map();
        console.log("Multiplayer socket instance started")
        this.gameRoomUpdateInterval = setInterval(() => {
            var i = 0;
            for (let gameroom of this.roomMap.entries()) {
                //check statuses for finished games first
                if (gameroom[1].status == "finished") {
                    this.roomMap.delete(gameroom[0])
                }
            }
        }, 500)
    }

    public getServer(): io.Server {
        return this.server;
    }
    public getRoomForPlayer(player: Player) {

    }
    async makePlayerJoinRoom(player2: Player) { //returning room name
        var i = 0;
        for (let room of this.roomMap) {
            if (room[1].status == "waiting") {
                if (room[1].getPlayer1Id() != player2.getUserId()) {
                    room[1].setPlayer2(player2) //assign player2 since player1 is already present
                    room[1].setPlayer1();
                    room[1].status = "active"; //change room status to active
                    try {
                        var leftuser = await prisma.user.findUnique({ where: { userID: room[1].getPlayer1Id() } })
                        var rightuser = await prisma.user.findUnique({ where: { userID: room[1].getPlayer2Id() } })

                        await prisma.game.create(
                            {
                                data: {
                                    gameRoomID: room[1].getRoomName(),
                                    leftPlayer: leftuser.login42,
                                    rightPlayer: rightuser.login42,
                                    active: true,
                                }
                            })
                        await prisma.user.update({
                            where: { userID: room[1].getPlayer1Id() },
                            data: {
                                userStatus: "playing"
                            }
                        })
                        await prisma.user.update({
                            where: { userID: room[1].getPlayer2Id() },
                            data: {
                                userStatus: "playing"
                            }
                        })
                        console.log("game created")
                    }
                    catch (e) {
                        console.log(e)
                    }
                    return room[1].getRoomName(); //return room name to make socket join
                }
            }
            i++;
        }
        return ("")
    }

}
