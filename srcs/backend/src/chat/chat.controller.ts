import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from 'src/auth/utils/Guards';
import {
  ChatService,
  PrivateMsgsDto,
  RoomDto,
  RoomReturnDto,
} from './chat.service';
import { Request } from 'express';
import { RequestWithUser } from 'src/dtos/auth.dtos';
import { AuthService } from 'src/auth/auth.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService, private authService: AuthService) {}

  @Get('userRooms')
  @UseGuards(JwtGuard)
  public async getRoomsFromUser(@Req() req: RequestWithUser) {
    const login: any = this.authService.authentificateSession(req);
    const rooms: RoomDto[] = this.chatService.getAllRoomsFromUser(login);

    const roomReturns = new Array<RoomReturnDto>();
    rooms.forEach((room) =>
      roomReturns.push(this.chatService.getReturnRoom(room)),
    );

    return { rooms: roomReturns };
  }

  @Get('userPMs')
  @UseGuards(JwtGuard)
  public async getPMsFromUser(@Req() req: RequestWithUser) {
    const user: any = req.user;

    const privateMsgs: PrivateMsgsDto[] = this.chatService.getUserPrivateMsgs(
      user.id,
    );

    return { privateMsgs: privateMsgs || [] };
  }

  @Get('roomNames')
  @UseGuards(JwtGuard)
  public async GetAllRoomNames() {
    const roomNames: string[] = this.chatService.getAllRoomNames();

    return { rooms: roomNames };
  }
}
