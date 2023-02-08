import { responsiveFontSizes } from "@mui/material";
import { PrivateProfileDto } from "utils/user.dto";

export interface MessageDto
{
    userID : string;
    userName : string;
    message : string;
}

export interface PrivateMsgsDto 
{
    userDto : PrivateProfileDto;
    messages : Array<MessageDto>;
}

export interface RoomDto
{
    roomName: string;
    owner:    string;
    admins:   Array<string>;
    users:    Array<PrivateProfileDto>;
    messages: Array<MessageDto>;
}

export class ChatAPI
{
    public static async getRoomsFromUser(): Promise<{ rooms: RoomDto[] | undefined }> {

        const resp = await fetch(
          `http://localhost:3000/chat/userRooms`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true',
            }
          }
        );
    
        return resp.ok ? resp.json() : {rooms : []};
      }
    
      public static async getPMsFromUser(): Promise<{ privateMsgs: PrivateMsgsDto[] }> {
    
        const resp = await fetch(
          `http://localhost:3000/chat/userPMs`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true',
            }
          }
        )
    
				return resp.ok ? resp.json() : {privateMsgs : []};
      }
    
      public static async getAllRoomNames(): Promise<{ rooms: string[] }> {
    
        const resp = await fetch(
          `http://localhost:3000/chat/roomNames`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true',
            }
          }
        );
    
        return resp.ok ? resp.json() : {rooms : []};
      }
}
