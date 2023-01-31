import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import {
  ChatService,
  PrivateMsgsDto,
  RoomDto,
  RoomReturnDto,
} from './chat.service';
import { Request } from 'express';
import { RequestWithUser } from 'src/dtos/auth.dtos';
import { AuthService } from 'src/auth/auth.service';
import { PrivateProfileDto } from 'src/dtos/profile.dtos';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService, private authService: AuthService) {}

  @Get('userRooms')
  @UseGuards(JwtAuthGuard)
  public async getRoomsFromUser(@Req() req: Request) {
    const user: any = req.user
    // const userDto: PrivateProfileDto = await this.authService.fetchUser(user);
    const rooms: RoomDto[] = this.chatService.getAllRoomsFromUser(user.id);

    const roomReturns = new Array<RoomReturnDto>();
    rooms.forEach((room) =>
      roomReturns.push(this.chatService.getReturnRoom(room)),
    );

    return { rooms: roomReturns };
  }

  @Get('userPMs')
  @UseGuards(JwtAuthGuard)
  public async getPMsFromUser(@Req() req: RequestWithUser) {
    const user: any = req.user;

    const privateMsgs: PrivateMsgsDto[] = this.chatService.getUserPrivateMsgs(
      user.id,
    );

    return { privateMsgs: privateMsgs || [] };
  }

  @Get('roomNames')
  @UseGuards(JwtAuthGuard)
  public async GetAllRoomNames() {
    const roomNames: string[] = this.chatService.getAllRoomNames();

    return { rooms: roomNames };
  }
}
