import { Injectable } from "@nestjs/common";
import * as io from 'socket.io'


export class Player {
    private userId: string
    private points: number
    public status: string

    constructor(userId) {
        this.userId = userId;
        this.points = 0;
        this.status = "waiting";
    }

}

export class GameRoom {
    private roomName: string
    private player1: Player
    private player2: Player

    public status: string

    constructor(player1: Player) {
        this.roomName = this.makeid(10); //default
        this.player1 = player1;
        this.status = "waiting" //default status
        console.log(`Lobby ${this.roomName} instanciated, waiting for second player`)
    }

    public makeid(length): string { //generating random room id's
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public setPlayer1(player: Player){
        if(this.player1 == null) //prevent possible reassignments from players who might try to trash the room
            this.player1 = player;
    }
    public setPlayer2(player: Player){
        if(this.player2 == null) //prevent possible reassignments from players who might try to trash the room
            this.player2 = player;
    }
    public getRoomName() {
        return this.roomName;
    }
}

@Injectable()
export class GameSocketIOService {

    private server: io.Server
    public socketMap: Map<string, io.Socket> //userid, socketid
    public roomMap: Array<GameRoom>

    constructor() {
        this.server = new io.Server(3001, {cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "DELETE"]
          }});
        this.socketMap = new Map<string, io.Socket> //userid, socketid
        this.roomMap = new Array<GameRoom>
        console.log("Multiplayer socket instance started")
    }

    public getServer(): io.Server {
        return this.server;
    }
    public makePlayerJoinRoom(player2: Player) { //returning room name
        var i = 0;
        for(let room of this.roomMap){
            if(room.status == "waiting"){
                this.roomMap[i].setPlayer2(player2); //assign player2 since player1 is already present
                this.roomMap[i].status = "active"; //change room status to active
                return this.roomMap[i].getRoomName(); //return name to make socket join room
            }
            i++;
        }
    }

}