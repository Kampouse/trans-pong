import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(`http://10.42.42.10:3001`, 
{ withCredentials: true});
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
