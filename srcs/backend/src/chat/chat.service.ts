import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrivateProfileDto } from 'src/dtos/profile.dtos';
import { Socket } from 'socket.io';
import { hashPwd } from 'src/helper/bcrypt';
import { ProfileService } from 'src/profile/profile.service';

export class MessageDto {
  userId: string;
  userName: string;
  message: string;
}

export class PrivateMsgsDto {
  userDto: PrivateProfileDto;
  messages: Array<MessageDto>;
}

export class RoomDto {
  roomName: string;
  owner: string;
  admins: Array<string>;
  users: Array<PrivateProfileDto>;
  messages: Array<MessageDto>;
  password: string;
  mutedMap: Map<string, string>;
  banMap: Map<string, string>;
}

export class RoomReturnDto {
  roomName: string;
  owner: string;
  admins: Array<string>;
  users: Array<PrivateProfileDto>;
  messages: Array<MessageDto>;
}

@Injectable()
export class ChatService {
  constructor(
    private userService: ProfileService,
    private authService: AuthService,
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

  async createRoom(
    roomName: string,
    password: string,
    userDto: PrivateProfileDto,
  ): Promise<RoomDto> {
    const roomDto = new RoomDto();

    roomDto.roomName = roomName;
    roomDto.owner = userDto.username;
    roomDto.admins = [userDto.username];
    roomDto.users = [];
    roomDto.messages = [];
    if (password && password !== '') {
      roomDto.password = await hashPwd(password);
    } else {
      roomDto.password = password;
    }
    roomDto.mutedMap = new Map();
    roomDto.banMap = new Map();

    this.RoomList.set(roomName.toUpperCase(), roomDto);
    this.addToRoom(userDto, roomDto);
    return roomDto;
  }

  /*********************** JOIN ROOM  ************************/

  addToRoom(userDto: PrivateProfileDto, room: RoomDto) {
    if (room.users.find(({ username }) => username === userDto.username)) {
      return;
    }

    room.users.push(userDto);
    this.RoomList.set(room.roomName.toUpperCase(), room);

    const sockets: Socket[] = this.authService.getSocketsFromUser(
      userDto.username,
    );
    sockets.forEach((socket) => socket.join(room.roomName));
  }

  /*********************** SEND MESSAGE ROOM && PRIVATE MESSAGE ************************/

  addNewRoomMessage(room: RoomDto, user: PrivateProfileDto, message: string): MessageDto {
    const messageDto: MessageDto = new MessageDto();
    messageDto.message = message;
    messageDto.userId = user.username;
    messageDto.userName = user.username;

    room.messages.push(messageDto);
    this.RoomList.set(room.roomName.toUpperCase(), room);
    return messageDto;
  }

  /*********************** LEAVE ROOM  ************************/

  leaveRoom(userId: string, room: RoomDto) {
    const userIndex = room.users.findIndex(({ username }) => username === userId);

    if (userIndex > -1) {
      room.users.splice(userIndex, 1);
    }

    const adminIndex = room.admins.indexOf(userId);

    if (adminIndex > -1) {
      room.admins.splice(adminIndex, 1);
    }

    this.RoomList.set(room.roomName.toUpperCase(), room);

    const sockets: Socket[] = this.authService.getSocketsFromUser(userId);
    sockets.forEach((socket) => {
      socket.leave(room.roomName);
    });
  }

  destroyRoom(room: RoomDto) {
    this.RoomList.delete(room.roomName.toUpperCase());
  }

  /*********************** CHANGE PW ************************/

  async changePassword(roomDto: RoomDto, password: string) {
    if (password === '') {
      roomDto.password = '';
    } else {
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
    } else {
      roomDto.banMap.set(userId, (time * 60 * 1000 + Date.now()).toString());
    }
    this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
  }

  setMuteTime(roomDto: RoomDto, userId: string, time: number) {
    if (time === 0) {
      roomDto.mutedMap.delete(userId);
    } else {
      roomDto.mutedMap.set(userId, (time * 60 * 1000 + Date.now()).toString());
    }
    this.RoomList.set(roomDto.roomName.toUpperCase(), roomDto);
  }

  addToPmList(sender: PrivateProfileDto, receiver: PrivateProfileDto) {
    let allSenderMsgs = this.PrivateMsgList.get(sender.username);
    let allReceiverMsgs = this.PrivateMsgList.get(receiver.username);

    if (!allSenderMsgs) {
      allSenderMsgs = [{ userDto: receiver, messages: [] }];
    } else {
      const userMessagesIdx = allSenderMsgs.findIndex(
        ({ userDto }) => userDto.username === receiver.username,
      );

      if (userMessagesIdx < 0) {
        allSenderMsgs.push({ userDto: receiver, messages: [] });
      }
    }

    if (!allReceiverMsgs) {
      allReceiverMsgs = [{ userDto: sender, messages: [] }];
    } else {
      const userMessagesIdx = allReceiverMsgs.findIndex(
        ({ userDto }) => userDto.username === sender.username,
      );

      if (userMessagesIdx < 0) {
        allReceiverMsgs.push({ userDto: sender, messages: [] });
      }
    }

    this.PrivateMsgList.set(sender.username, allSenderMsgs);
    this.PrivateMsgList.set(receiver.username, allReceiverMsgs);
  }

  addPrivateMessage(
    sender: PrivateProfileDto,
    receiver: PrivateProfileDto,
    message: string,
  ): MessageDto {
    const allSenderMsgs = this.PrivateMsgList.get(sender.username);
    const allReceiverMsgs = this.PrivateMsgList.get(receiver.username);

    const messageDto: MessageDto = new MessageDto();
    messageDto.message = message;
    messageDto.userId = sender.username;
    messageDto.userName = sender.username;

    allSenderMsgs
      .find(({ userDto }) => userDto.username === receiver.username)
      .messages.push(messageDto);
    allReceiverMsgs
      .find(({ userDto }) => userDto.username === sender.username)
      .messages.push(messageDto);

    this.PrivateMsgList.set(sender.username, allSenderMsgs);
    this.PrivateMsgList.set(receiver.username, allReceiverMsgs);
    return messageDto;
  }

  /*
   **
   ** @Controller
   **
   */

  getAllRoomsFromUser(userId: string): RoomDto[] {
    const userRooms = new Array<RoomDto>();
    this.RoomList.forEach((value) => {
      value.users.find(({ username }) => username === userId) &&
        userRooms.push(value);
    });
    return userRooms;
  }

  /* all room list string room name */
  getAllRoomNames(): string[] {
    const roomNames = new Array<string>();
    this.RoomList.forEach((element) => roomNames.push(element.roomName));
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

  async getUserFromSocket(socket: Socket): Promise<PrivateProfileDto> {
    const userDto: PrivateProfileDto = await this.authService.getUserFromSocket(socket);
    return userDto;
  }

  getRoomFromName(name: string): RoomDto {
    return this.RoomList.get(name.toUpperCase());
  }

  isBanned(roomDto: RoomDto, userId: string): boolean {
    const time = Number(roomDto.banMap.get(userId));
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
    const time = Number(roomDto.mutedMap.get(userId));
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
    return this.RoomList.has(roomName.toUpperCase());
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

  async getUserFromId(id: string): Promise<PrivateProfileDto> {
    return await this.userService.findOneById(id);
  }

  async addSocketToRooms(socket: Socket) {
    const userDto: PrivateProfileDto = await this.authService.getUserFromSocket(socket);
    if (!userDto) {
      return;
    }

    this.RoomList.forEach((value) => {
      value.users.find(({ username }) => username === userDto.username) &&
        socket.join(value.roomName);
    });
  }

  isAdminFromRoom(userId: string, roomDto: RoomDto): boolean {
    return roomDto.admins.find((userID) => userID === userId) ? true : false;
  }
}
