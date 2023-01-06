import { Injectable } from "@nestjs/common";
import {GameUpdate, UpdateProps, UpdateProp} from './object.game'
import * as io from 'socket.io'
import { UpdateGameDto } from "src/dtos/gameUpdate.dtos";


export class Player {
    private userId: string
    private points: number
    private socket: io.Socket; //for id
    private actions: UpdateProp = {keyActions:{up: false, down:false}};
    public status: string

    constructor(userId, socket:io.Socket) {
        this.userId = userId;
        this.points = 0;
        this.status = "waiting";
        this.socket = socket;
        socket.on("updatePlayerPosition", (keyActions) => {
            console.log(keyActions);
            if(keyActions.direction == "ArrowUp"){
                this.setKeyArrowUp();
            }
            if(keyActions.direction == "ArrowDown"){
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

    public getKeyActionCurrentState():UpdateProp {
        return this.actions;
    }

}

export class GameRoom {
    private roomName: string
    private player1: Player
    private player2: Player
    private updateInterval;
    private tempWaitForPlayerReadyInterval
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
            if(this.player1.status == "ready" && this.player2.status == "ready")
            {
                clearInterval(this.tempWaitForPlayerReadyInterval);
                this.startGameUpdateInterval(this.server)
            }
        }, 500) //every 500 milliseconds the interval will check if players are ready
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
    public startGameUpdateInterval(server: io.Server) {
        this.updateInterval = setInterval(() => {
            this.gameUpdateObject.update({keyActionsPlayer1: this.player1.getKeyActionCurrentState(), keyActionsPlayer2: this.player2.getKeyActionCurrentState()})
            this.gameUpdateObject.updateGameUpdateDto(); //should change the object properties hopefully
            console.log(this.gameUpdateObject.updateGame);
            server.to(this.getRoomName()).emit("gameUpdate", this.gameUpdateObject.updateGame)
        }, (1/60) * 1000) //60 fps
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