import {Server} from "http";
import socketIO, {Socket} from "socket.io";
import { createStore } from "redux";

let io: any= null;

export type SocketMessage = "chat_message" | "user_connected";

type SocketActionFn<T> = (message: T) => void;

interface WrappedServerSocket<T> {
  event: string;
  callback: SocketActionFn<T>;
}

function broadcast<T>(event: SocketMessage) {
  return (message: T) => io.emit(event, message);
}

function createSocket<T>(event: SocketMessage, action?: SocketActionFn<T>): WrappedServerSocket<T> {
  const callback = action || broadcast(event);
  return { event, callback };
}

export default function createSocketServer(server: Server) {
  io = socketIO(server);
  io.on("connection", (socket: Socket) => {
     console.log('Socket connected')
     socket.emit('chat_message', 'this is a test')
  });
}

const chatMessageEvent = createSocket<string>("chat_message");

const registeredEvents = [chatMessageEvent];

export interface User {
  id: string;
  name: string;
}

const userConnectedEvent = createSocket<User>("user_connected")

const userConnectedLogEvent = createSocket<User>("user_connected", (user) => {
  console.log(user.id);    // Compiles OK, user gets inferred as User
  console.log(user.name);  // TypeError! Type doesn't exist in User
})