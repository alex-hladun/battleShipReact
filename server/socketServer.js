const { OnlineGame } =require('./modules/OnlineGame')
const { ComputerGame } =require('./modules/ComputerGame')
const { Rooms } = require('./modules/Rooms')
const socketIO = require('socket.io')

module.exports = {
  newSocketServer: function (http) {
    const io = socketIO(http)

    console.log('Starting socket server...')

    const gameList = new Rooms(io)


    io.sockets.on("connection", function (socket) {
      // Send roomList to each new participant
      console.log('Socket connected to server')
      socket.join("lobby");
      socket.emit("set_game_id", 'alex is cool')
      // io.emit("set_game_id", 'test')
      console.log('socket emit send')

      socket.on('newGame', data => {
        console.log('new game data request', data)
        switch (data.type) {
          case 'online':
            gameList.newOnlineRoom('randomGameName', data.payload.boardSize, data.payload.host);
            console.log(gameList.roomList)
            break;
          case 'computer':
            gameList.newComputerRoom('randomGameName', data.payload.boardSize, data.payload.host, data.payload.difficulty);
            break;
          default:
            break;
        }
      })
    })
  }
}
