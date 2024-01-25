import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

const config = useRuntimeConfig();

class SocketIOService {
  socket: Socket;
  constructor() {
    this.socket = io(config.public.strapiWS);
  }
}

// create an instance/connection here
export const socket = new SocketIOService().socket;


