import { Inject, Injectable } from "@nestjs/common";
import { ChatRoomType, PrismaClient } from "@prisma/client";

@Injectable()
export class ChatRoomService
{
    private prisma: PrismaClient;
  constructor(@Inject('PrismaClient') prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createChatRoom(data: { name: string; chatRoomtype: ChatRoomType }) {
    return this.prisma.chatRoom.create({data,}); 
   }

   async getChatRooms()
   {
        return this.prisma.chatRoom.findMany();
   }
   async getChatRoom(id:string)
   {
        return this.prisma.chatRoom.findOne({where;})
   }
}