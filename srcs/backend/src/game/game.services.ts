import { Injectable } from "@nestjs/common";
import * as io from 'socket.io'

@Injectable()
export class GameSocketIOService {

    private server: io.Server;
    public socketMap: Map<string, string> //userid, socketid

    constructor() {
        this.server = new io.Server(3001, {cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "DELETE"]
          }});
        this.socketMap = new Map<string, string> //userid, socketid
    }

    public getServer(): io.Server {
        return this.server;
    }

}