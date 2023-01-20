import { UserDto } from "utils/user.dto";

export interface MessageDto
{
    userID : string;
    userName : string;
    message : string;
}

export interface PrivateMsgsDto 
{
    userDto : UserDto;
    messages : Array<MessageDto>;
}

export interface RoomDto
{
    roomName: string;
    owner:    string;
    admins:   Array<string>;
    users:    Array<UserDto>;
    messages: Array<MessageDto>;
}

export class ChatAPI
{
    public static async getRoomsFromUser(): Promise<{ rooms: RoomDto[] }> {

        const resp = await fetch(
          `http://10.11.6.1:3000/chat/userRooms`,
          {
            credentials: "include",
            method: "GET",
          }
        );
    
        return resp.ok ? resp.json() : {rooms : []};
      }
    
      public static async getPMsFromUser(): Promise<{ privateMsgs: PrivateMsgsDto[] }> {
    
        const resp = await fetch(
          `http://10.11.6.1:3000/chat/userPMs`,
          {
            credentials: "include",
            method: "GET",
          }
        );
    
        return resp.ok ? resp.json() : {privateMsgs : []};
      }
    
      public static async getAllRoomNames(): Promise<{ rooms: string[] }> {
    
        const resp = await fetch(
          `http://10.11.6.1:3000/chat/roomNames`,
          {
            credentials: "include",
            method: "GET",
          }
        );
    
        return resp.ok ? resp.json() : {rooms : []};
      }
}