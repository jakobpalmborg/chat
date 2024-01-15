import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";


class SocketIOService {
  socket: Socket;
  constructor() {
    this.socket = io("ws://localhost:1337");
  }
}

// create an instance/connection here
export const socket = new SocketIOService().socket;
