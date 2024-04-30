import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

class SocketService {
  socket;

  constructor() {
    this.socket = io(SOCKET_URL);
  }

  sendMessage(message) {
    this.socket.emit("newMessage", message);
  }

  setMessageHandler(callback) {
    this.socket.on("newMessage", (data) => callback(data));
  }
}

const socketService = new SocketService();
export default socketService;
