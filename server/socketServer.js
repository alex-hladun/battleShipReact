const { OnlineGame } = require('./modules/OnlineGame')
const { ComputerGame } = require('./modules/ComputerGame')
const { GameList } = require('./modules/GameList')
const socketIO = require('socket.io')
const Player = require('./modules/Player')

module.exports = {
  newSocketServer: function (http) {
    const io = socketIO(http)

    console.log('Starting socket server...')

    const gameManager = new GameList(io)

    const genRanString = () => {
      return 'game' + (Math.random() * 1000000).toFixed(0)
    }


    io.sockets.on("connection", function (socket) {
      // Send roomList to each new participant
      console.log('Socket connected to server')
      socket.join("lobby");
      gameManager.sendRoomUpdate(io)

      socket.on('newGame', data => {
        console.log('new game data request', data)
        socket.join(data.payload.gameName)
        switch (data.type) {
          case 'online':
            gameManager.newOnlineRoom(data.payload.gameName, data.payload.boardSize, data.payload.username, data.payload.shipList);
            console.log('game id sending socket', {
              gameID: data.payload.gameName
            })
            io.to(data.payload.gameName).emit("set_game_id", {
              gameID: data.payload.gameName
            })
            // console.log(gameManager.onlineRoomList)
            break;
          case 'computer':
            gameManager.newComputerRoom(genRanString(), data.payload.boardSize, data.payload.host, data.payload.difficulty);
            break;
          default:
            break;
        }
      })

      socket.on('donePlacing', data => {
        console.log('done placing data', data)
        // console.log(gameManager.onlineRoomList[data.game])
        if (gameManager.onlineRoomList[data.game].host.name === data.user) {
          gameManager.onlineRoomList[data.game].host.board = data.board
          gameManager.onlineRoomList[data.game].sendHostUpdate(io)
          console.log(gameManager.onlineRoomList[data.game])
        } else if (gameManager.onlineRoomList[data.game].opponent.name === data.user) {
          gameManager.onlineRoomList[data.game].opponent.name.board = data.board
          gameManager.onlineRoomList[data.game].sendOpponentUpdate()
        }
      })

      socket.on('joinGame', data => {
        if (data.type === 'Online') {
          gameManager.onlineRoomList[data.game].opponent = new Player(data.user);
          socket.join(data.game)
          socket.emit('joinSuccess', {
            shipList: gameManager.onlineRoomList[data.game].host.shipList,
            boardSize: gameManager.onlineRoomList[data.game].boardSize,
            hostTurn: gameManager.onlineRoomList[data.game].hostTurn,
            opponentGhostBoard: gameManager.onlineRoomList[data.game].host.ghostBoard
          })
        } else if (data.type === 'Computer') {

        }
      })


      socket.on('attack', data => {
        let gameOver = false;
        if (gameManager.onlineRoomList[data.game].host.name === data.user) {
          gameOver = gameManager.onlineRoomList[data.game].host.attack(gameManager.onlineRoomList[data.game].opponent, data.row, data.col)
          gameManager.onlineRoomList[data.game].sendOpponentUpdate(io);
        } else {
          gameOver = gameManager.onlineRoomList[data.game].opponent.attack(gameManager.onlineRoomList[data.game].host, data.row, data.col)
          gameManager.onlineRoomList[data.game].sendHostUpdate(io);
        }

        if (gameOver) {
          console.log('socket message to end game')
        }
      })


    })
  }
}
