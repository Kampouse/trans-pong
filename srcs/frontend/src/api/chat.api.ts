import { User } from 'prisma/prisma-client'

export interface MessageDto
{
    userID : string;
    userName : string;
    message : string;
}

export interface PrivateMsgsDto 
{
    user : User;
    messages : Array<MessageDto>;
}

export interface RoomDto
{
    roomName: string;
    owner:    string;
    admins:   Array<string>;
    users:    Array<User>;
    messages: Array<MessageDto>;
}

export class ChatAPI
{
    public static async getRoomsFromUser(): Promise<{ rooms: RoomDto[] }> {

        const resp = await fetch(
          `http://localhost:3000/chat/userRooms`,
          {
            credentials: "include",
            method: "GET",
          }
        );
          console.log('tried it rooms from user');
        return resp.ok ? resp.json() : {rooms : []};
      }
    
      public static async getPMsFromUser(): Promise<{ privateMsgs: PrivateMsgsDto[] }> {
    
        const resp = await fetch(
          `http://localost:3000/chat/userPMs`,
          {
            credentials: "include",
            method: "GET",
          }
        );
    
        console.log('tried it PMS from user');
        return resp.ok ? resp.json() : {privateMsgs : []};
      }
    
      public static async getAllRoomNames(): Promise<{ rooms: string[] }> {
    
        const resp = await fetch(
          `http://localhost:3000/chat/roomNames`,
          {
            credentials: "include",
            method: "GET",
          }
        );
    
        return resp.ok ? resp.json() : {rooms : []};
      }
}