import { Controller, Get, Req, Redirect, Res, Param } from '@nestjs/common';
import { GameRoom, GameSocketIOService, Player } from './game.services';
import { RequestWithUser } from 'src/dtos/auth.dtos';
import { prisma } from 'src/main';

@Controller()
export class GameSocketIOController {
  constructor(private gameSocketIO: GameSocketIOService) {
    const server = this.gameSocketIO.getServer();

    server.on('connection', (socket) => {
      console.log('New socket: ' + socket.id);

      socket.on('disconnect', () => {
        console.log('Socket disconnected: ' + socket.id);
        //do things here to remove user from a game it might be in maybe ?
        this.gameSocketIO.socketMap.delete(socket.id)
      });

      socket.on('registerId', (user) => {
        gameSocketIO.socketMap.set(user.socket, user.userId)
        socket.join(user.socket)
        //gameSocketIO.socketMap[user.socket] = user.userId; //keeping socket instance in the map so we can retrieve it later
        //console.log(gameSocketIO.socketMap)
      });


      socket.on('searchGame', async () => {
        const room = this.tryGetAvailableRoom(gameSocketIO.roomMap);
        //console.log(gameSocketIO.roomMap.size)
        if (gameSocketIO.roomMap.size == 0 || room == null) {
          //no room found, add new room
          const newRoom: GameRoom = new GameRoom(
            new Player(this.gameSocketIO.socketMap.get(socket.id), socket),
            gameSocketIO.getServer(),
          );
          gameSocketIO.roomMap.set(newRoom.getRoomName(), newRoom); //adds new room to list
          socket.join(newRoom.getRoomName()); //make client socket join room
        } else {
          //array isnt empty and there are rooms available
          const roomName = await this.gameSocketIO.makePlayerJoinRoom(
            new Player(this.gameSocketIO.socketMap.get(socket.id), socket),
          );
          if (roomName == '') {
            socket.emit('noSuitableRoomFound');
          } else {
            socket.join(roomName); //all players are in the game, status is set to active
            server.to(roomName).emit('roomIsReady', roomName); //pass control to game execution
          }
        }
      });

      socket.on('joinPrivateGame', async () => {
        const newRoom: GameRoom = new GameRoom(
          new Player(this.gameSocketIO.socketMap.get(socket.id), socket),
          gameSocketIO.getServer(),
        );
        gameSocketIO.privateRoomMap.set(newRoom.getRoomName(), newRoom); //adds new room to list
        socket.join(newRoom.getRoomName()); //make client socket join room
        socket.emit('joinedGame', newRoom.getRoomName());
      });

      socket.on('joinRoom', async (roomId) => {
        console.log(socket.id);
        socket.join(roomId);
        const roomName = await this.gameSocketIO.makePlayerJoinRoom(
          new Player(this.gameSocketIO.socketMap.get(socket.id), socket),
          roomId,
        );
        server.to(roomId).emit('roomIsReady', roomId); //pass control to game execution
      });

      socket.on('inviteGame', async (inviteData) => {
        console.log(inviteData)
        let user;
        try {
          console.log('getting user');
          user = await prisma.user.findUnique({
            where: { username: inviteData['user'] },
          });
          if(user.userStatus != "playing")
          {
            const socketid = this.getUserFromSocketId(
              this.gameSocketIO.socketMap,
              user.userID,
            );
            console.log('id: ' + socketid);
            console.log("emiiting to socket")
            server.to(socketid).emit('inviteGamePrivate', inviteData['roomId']);
          }
          else{
            socket.emit("playerBusy")
            socket.leave(inviteData['roomId'])
          }
        } catch {
          console.log('oops failed');
        }
      });

      socket.on('socketIsConnected', () => {
        socket.emit('ack', socket.id);
      });

      socket.on('joinedGame', () => {
        console.log(`Socket ${socket.id} landed on the game`);
      });

      socket.on('spectateGame', (roomID) => {
        console.log(roomID);
        socket.join(roomID);
        socket.emit('roomIsReady');
      });

      socket.on('ping', async (userid) => {
        const date = new Date();
        if (userid != '' && userid != null) {
          const user = await prisma.user.findUnique({
            where: { userID: userid },
          });
          if (user && user.userStatus == 'playing')
            await prisma.user.update({
              where: { userID: userid },
              data: {
                userStatus: 'playing',
                activeAt: date.toISOString(),
              },
            });
          else if (user && user.userStatus == 'online')
            await prisma.user.update({
              where: { userID: userid },
              data: {
                userStatus: 'online',
                activeAt: date.toISOString(),
              },
            });
          else if (user && user.userStatus == 'offline')
            await prisma.user.update({
              where: { userID: userid },
              data: {
                userStatus: 'online',
                activeAt: date.toISOString(),
              },
            });
        }
      });
    });

    server.on('disconnect', () => {
      console.log('server shutted down');
    });
  }

  getUserFromSocketId(map: Map<string, string>, searchValue: string): string {
    console.log(map);
    console.log(searchValue);
    let ret = ""
    map.forEach((value, key) => {
        console.log("value: " + value)
        if(value == searchValue)
            ret = key
    });
    return ret
  }
  tryGetAvailableRoom(gameRoom: Map<string, GameRoom>) {
    for (const room of gameRoom) {
      if (room[1].status == 'waiting')
        //room has available slot
        return room[1];
    }
    return null;
  }

  @Get('game/:id')
  printId(@Param('id') id: string) {
    console.log(`accessing game ${id}`);
  }
}
