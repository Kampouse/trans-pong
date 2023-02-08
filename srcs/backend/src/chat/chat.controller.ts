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
  constructor(
    private readonly chatService: ChatService,
    private authService: AuthService,
  ) {}

  @Get('userRooms')
  @UseGuards(JwtGuard)
  public async getRoomsFromUser(@Req() req: RequestWithUser) {
    const login: any = this.authService.authentificateSession(req);

    if (login == undefined)
        return;

    const rooms: RoomDto[] = await this.chatService.getAllRoomsFromUser(login);

    const roomReturns = new Array<RoomReturnDto>();
    if (rooms)
    {
        rooms.forEach((room) =>
        roomReturns.push(this.chatService.getReturnRoom(room)),);
    }

    return { rooms: roomReturns };
  }

  @Get('userPMs')
  @UseGuards(JwtGuard)
  public async getPMsFromUser(@Req() req: RequestWithUser)
  {
    const login = await this.authService.authentificateSession(req);

    if (login == undefined)
        return;

    const privateMsgs: PrivateMsgsDto[] = await this.chatService.getUserPrivateMsgs(login);

    return { privateMsgs: privateMsgs || [] };
  }

  @Get('roomNames')
  @UseGuards(JwtGuard)
  public async GetAllRoomNames(@Req() req: RequestWithUser)
  {
    const login: any = this.authService.authentificateSession(req);

    if (login == undefined)
        return;

    const roomNames: string[] = this.chatService.getAllRoomNames();

    return { rooms: roomNames };
  }
}
