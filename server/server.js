
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');
const pino = require('express-pino-logger')();
// const db = require('./db.js');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const PORT =  3001
const path = require('path')



// let io;

// export type SocketMessage = "chat_message" | "user_connected";

// type SocketActionFn<T> = (message: T) => void;

// interface WrappedServerSocket<T> {
//   event: string;
//   callback: SocketActionFn<T>;
// }

// function broadcast<T>(event: SocketMessage) {
//   return (message: T) => io.emit(event, message);
// }

// function createSocket<T>(event: SocketMessage, action?: SocketActionFn<T>): WrappedServerSocket<T> {
//   const callback = action || broadcast(event);
//   return { event, callback };
// }

// export function createSocketServer(server: Server) {
//   io = socketIO(server);
//   io.on("connection", (socket: Socket) => {
//      console.log('Socket connected')
//      socket.emit('chat_message', 'this is a test')
//   });
// }

// const chatMessageEvent = createSocket<string>("chat_message");

// const registeredEvents = [chatMessageEvent];

// export interface User {
//   id: string;
//   name: string;
// }

// const userConnectedEvent = createSocket<User>("user_connected")

// const userConnectedLogEvent = createSocket<User>("user_connected", (user) => {
//   console.log(user.id);    // Compiles OK, user gets inferred as User
//   console.log(user.name);  // TypeError! Type doesn't exist in User
// })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2'],
//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }));
app.use(pino);



app.use(express.static('build'));
app.get('*', (req, res) => res.sendFile(path.resolve('./public/index.html')))

http.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`)
});

io.sockets.on("connection", function (socket) {
  // Send roomList to each new participant
  socket.join("lobby");
  socket.emit("chat_message", 'test')
})
