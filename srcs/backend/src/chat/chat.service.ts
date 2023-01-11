import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ProfileService } from '../profile/profile.service';
import { Socket } from 'socket.io';
import { hashPwd } from './helper/bcrypt';
import { Prisma, User} from '.prisma/client';



export class MessageDto {
  userId : string;
  userName : string;
  message : string;
};

export class PrivateMsgsDto {
  user : User;
  messages : Array<MessageDto>;
};

export class RoomDto {
  roomName : string;
  owner : string;
  admins : Array<string>;
  users : Array<User>;
  messages : Array<MessageDto>;
  password : string;
  mutedMap : Map<string, string>;
  banMap : Map<string,string>;
};

export class RoomReturnDto {
  roomName : string;
  owner : string;
  admins : Array<string>;
  users : Array<User>;
  messages : Array<MessageDto>;
};

@Injectable()
export class ChatService {

    constructor(
      private userService: ProfileService, 
      private authService: AuthService
    ) {
      this.RoomList = new Map();
      this.PrivateMsgList = new Map();

    }

    public RoomList: Map<string, RoomDto>;
    public PrivateMsgList: Map<string, PrivateMsgsDto[]>;

    /*
    **
    ** @Gateway
    **
    */
               /*********************** CREATE ROOM  ************************/


  async createRoom(roomName: string, password: string, user: User): Promise<RoomDto> {
    const roomDto = new RoomDto();

    roomDto.roomName = roomName;
    roomDto.owner = user.userID;
    roomDto.admins = [user.userID];
    roomDto.users = [];
    roomDto.messages = [];
    if (password && password !== '') {
      roomDto.password = await hashPwd(password);
    }
    else {
      roomDto.password = password;
    }
    roomDto.mutedMap = new Map();
    roomDto.banMap = new Map();

    this.RoomList.set(roomName.toUpperCase(), roomDto);
    this.addToRoom(user, roomDto);
    return roomDto;
  }

                   /*********************** JOIN ROOM  ************************/


  addToRoom(user: User, room: RoomDto) {
    if (room.users.find(({userID}) => userID === user.userID )) {
      return ;
    }

    room.users.push(user);
    this.RoomList.set(room.roomName.toUpperCase(), room);

    const sockets: Socket[] = this.authService.getSocketsFromUser(user.userID);
    sockets.forEach(socket => socket.join(room.roomName));
  }

      /*********************** SEND MESSAGE ROOM && PRIVATE MESSAGE ************************/

  addNewRoomMessage(room: RoomDto, user: User, message: string): MessageDto {
    const messageDto: MessageDto = new MessageDto();
    messageDto.message = message;
    messageDto.userId = user.userID;
    messageDto.userName = user.username;

    room.messages.push(messageDto);
    this.RoomList.set(room.roomName.toUpperCase(), room);
    return messageDto;
  }

       /*********************** LEAVE ROOM  ************************/


  leaveRoom(userId: string, room: RoomDto) {
    const userIndex = room.users.findIndex(({userID}) => userID === userId);

    if (userIndex > -1) {
      room.users.splice(userIndex, 1);
    }

    const adminIndex = room.admins.indexOf(userId);

    if (adminIndex > -1) {
      room.admins.splice(adminIndex, 1);
    }

    this.RoomList.set(room.roomName.toUpperCase(), room);

    const sockets: Socket[] = this.authService.getSocketsFromUser(userId);
    sockets.forEach((socket) => { socket.leave(room.roomName) });
  }

  destroyRoom(room: RoomDto) {
   this.RoomList.delete(room.roomName.toUpperCase());
  }

       /*********************** CHANGE PW ************************/

  async changePassword(roomDto: RoomDto, password: string) {
    if (password === '') {
      roomDto.password = '';
    }
    else {
      roomDto.password = await hashPwd(password);
    }
    this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
  }


    /*********************** Set Admin  ************************/

  setAdmin(roomDto: RoomDto, userId: string) {
    if (!this.isAdminFromRoom(userId, roomDto)) {
      roomDto.admins.push(userId);
      this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
    }
  }

  unsetAdmin(roomDto: RoomDto, userId: string) {
    const adminIndex = roomDto.admins.indexOf(userId);

    if (adminIndex > -1) {
      roomDto.admins.splice(adminIndex, 1);
    }

    this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);

  }

  setBanTime(roomDto: RoomDto, userId: string, time: number) {
    if (time <= 0) {
      roomDto.banMap.delete(userId);
    }
    else {
      roomDto.banMap.set(userId, (time * 60 * 1000 + Date.now()).toString());
    }
    this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
  }

  setMuteTime(roomDto: RoomDto, userId: string, time: number) {
    if (time === 0) {
      roomDto.mutedMap.delete(userId);
    }
    else {
      roomDto.mutedMap.set(userId, (time * 60 * 1000 + Date.now()).toString());
    }
    this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
  }

  addToPmList(sender: User, receiver: User) {
    let allSenderMsgs = this.PrivateMsgList.get(sender.userID);
    let allReceiverMsgs = this.PrivateMsgList.get(receiver.userID);


    if (!allSenderMsgs) {
      allSenderMsgs = [{user: receiver, messages: []}]
    }
    else {
      const userMessagesIdx = allSenderMsgs.findIndex(({user}) => user.userID === receiver.userID );

      if (userMessagesIdx < 0) {
        allSenderMsgs.push({user: receiver, messages: []});
      }
    }

    if (!allReceiverMsgs) {
      allReceiverMsgs = [{user: sender, messages: []}]
    }
    else {
      const userMessagesIdx = allReceiverMsgs.findIndex(({user}) => user.userID === sender.userID );

      if (userMessagesIdx < 0) {
        allReceiverMsgs.push({user: sender, messages: []});
      }
    }

    this.PrivateMsgList.set(sender.userID, allSenderMsgs);
    this.PrivateMsgList.set(receiver.userID, allReceiverMsgs);
  }

  addPrivateMessage(sender: User, receiver: User, message: string): MessageDto {
    let allSenderMsgs = this.PrivateMsgList.get(sender.userID);
    let allReceiverMsgs = this.PrivateMsgList.get(receiver.userID);

    const messageDto: MessageDto = new MessageDto();
    messageDto.message = message;
    messageDto.userId = sender.userID;
    messageDto.userName = sender.username;

    allSenderMsgs.find(({user}) => user.userID === receiver.userID ).messages.push(messageDto);
    allReceiverMsgs.find(({user}) => user.userID === sender.userID ).messages.push(messageDto);

    this.PrivateMsgList.set(sender.userID, allSenderMsgs);
    this.PrivateMsgList.set(receiver.userID, allReceiverMsgs);
    return messageDto;
  }

  /*
  **
  ** @Controller
  **
  */

  getAllRoomsFromUser(userId : string): RoomDto[] {
    const userRooms = new Array<RoomDto>;
    this.RoomList.forEach((value) => { value.users.find( ({userID}) => userID === userId ) && userRooms.push(value); })
    return userRooms;
  }



  /* all room list string room name */
  getAllRoomNames(): string[] {
    const roomNames = new Array<string>;
    this.RoomList.forEach(element => roomNames.push(element.roomName));
    return roomNames;
  }

  /*
  **
  ** @Utils
  **
  */
 
  getUserPrivateMsgs(userId: string) {
    return this.PrivateMsgList.get(userId);
  }

  async getUserFromSocket(socket: Socket): Promise<User> {
    const user: User = await this.authService.getUserFromSocket(socket);
    return user;
  }

  getRoomFromName(name: string): RoomDto {
    return (this.RoomList.get(name.toUpperCase()));
  }

  isBanned(roomDto: RoomDto, userId: string): boolean {
    const time: number = Number(roomDto.banMap.get(userId));
    if (!time) {
      return false;
    }
    if (time <= Date.now()) {
      roomDto.banMap.delete(userId);
      this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
      return false;
    }
    return true;
  }

  isMuted(roomDto: RoomDto, userId: string): boolean {
    const time: number = Number(roomDto.mutedMap.get(userId));
    if (!time) {
      return false;
    }
    if (time <= Date.now()) {
      roomDto.mutedMap.delete(userId);
      this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
      return false;
    }
    return true;
  }

  roomExist(roomName: string): boolean {
    return (this.RoomList.has(roomName.toUpperCase()));
  }

  getReturnRoom(roomDto: RoomDto): RoomReturnDto {
    const roomReturnDto: RoomReturnDto = new RoomReturnDto();

    roomReturnDto.roomName = roomDto.roomName;
    roomReturnDto.owner = roomDto.owner;
    roomReturnDto.admins = roomDto.admins;
    roomReturnDto.users = roomDto.users;
    roomReturnDto.messages = roomDto.messages;

    return roomReturnDto;
  }

  async getUserFromId(id: string): Promise<User> {
    return await this.userService.findOneById(id);
  }

  async addSocketToRooms(socket: Socket) {
    const user: User = await this.authService.getUserFromSocket(socket);
    if (!user) {
      return ;
    }

    this.RoomList.forEach((value) => { value.users.find( ({userID}) => userID === user.userID ) && socket.join(value.roomName); });
  }

  isAdminFromRoom(userId: string, roomDto: RoomDto): boolean {
    return (roomDto.admins.find(id => id === userId)? true : false);
  }
}