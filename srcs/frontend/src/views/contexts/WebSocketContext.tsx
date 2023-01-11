import { createContext } from "react";
import { io, Socket } from "socket.io-client";


//export const socket = io("http://10.3.5.1:8000");
export const socket = io(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`, 
{ withCredentials: true});
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
