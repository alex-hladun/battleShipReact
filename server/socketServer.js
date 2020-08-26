const { OnlineGame } = require('./modules/OnlineGame')
const { ComputerGame } = require('./modules/ComputerGame')
const { GameList } = require('./modules/GameList')
const socketIO = require('socket.io')

module.exports = {
  newSocketServer: function (http) {
    const io = socketIO(http)

    console.log('Starting socket server...')

    const gameManager = new GameList(io)

    const genRanString = () => {
      return 'game' + (Math.random()*1000000).toFixed(0)
    }


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
            gameManager.newOnlineRoom(genRanString(), data.payload.username, data.payload.boardSize);
            console.log(gameManager.onlineRoomList)
            break;
          case 'computer':
            gameManager.newComputerRoom(genRanString(), data.payload.boardSize, data.payload.host, data.payload.difficulty);
            break;
          default:
            break;
        }
      })
    })
  }
}
