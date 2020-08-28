const { OnlineGame } = require('./modules/OnlineGame')
const { ComputerGame } = require('./modules/ComputerGame')
const { GameList } = require('./modules/GameList')
const socketIO = require('socket.io')
const { Player } = require('./modules/Player')

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
        socket.join(data.payload.gameName)
        switch (data.type) {
          case 'online':
            gameManager.newOnlineRoom(data.payload.gameName, data.payload.boardSize, data.payload.username, data.payload.shipList);
            io.to(data.payload.gameName).emit("set_game_id", {
              gameID: data.payload.gameName
            })
            gameManager.sendRoomUpdate(io)
            break;
          case 'computer':
            gameManager.newComputerRoom(genRanString(), data.payload.boardSize, data.payload.host, data.payload.difficulty);
            break;
          default:
            break;
        }

        // console.log(gameManager.onlineRoomList)
      })

      socket.on('donePlacing', data => {
        console.log('done placing data', data)
        // console.log(gameManager.onlineRoomList[data.game])
        if (gameManager.onlineRoomList[data.game].host.name === data.user) {
          gameManager.onlineRoomList[data.game].host.board = data.board;
          console.log('host board', gameManager.onlineRoomList[data.game].host.board)
          gameManager.onlineRoomList[data.game].hostReady = true;
          // gameManager.onlineRoomList[data.game].sendHostUpdate(io);
          console.log(gameManager.onlineRoomList[data.game]);
        } else if (gameManager.onlineRoomList[data.game].opponent.name === data.user) {
          gameManager.onlineRoomList[data.game].opponent.board = data.board;
          console.log('opponent board', gameManager.onlineRoomList[data.game].opponent.board)
          gameManager.onlineRoomList[data.game].opponentReady = true;
          // gameManager.onlineRoomList[data.game].sendOpponentUpdate(io);
        }
        gameManager.sendGameMessage(io, data.game, `${data.user} has finished placing their ships.`)

        gameManager.onlineRoomList[data.game].checkBothReady()
        if (gameManager.onlineRoomList[data.game].checkBothReady()) {
          if (Math.random() > 0.5) {
            gameManager.onlineRoomList[data.game].currentTurn = gameManager.onlineRoomList[data.game].host.name
          } else {
            gameManager.onlineRoomList[data.game].currentTurn = gameManager.onlineRoomList[data.game].opponent.name
          }
          gameManager.sendGameMessage(io, data.game, `Both players ready! ${gameManager.onlineRoomList[data.game].currentTurn} goes first.`)
          gameManager.onlineRoomList[data.game].startGame(io)
        }

      })

      socket.on('joinGame', data => {
        if (data.type === 'Online') {
          gameManager.onlineRoomList[data.payload.game].opponent.name = data.payload.user;
          socket.join(data.payload.game)
          socket.emit('joinSuccess', {
            gameID: data.payload.game,
            shipList: gameManager.onlineRoomList[data.payload.game].host.shipList,
            boardSize: gameManager.onlineRoomList[data.payload.game].boardSize,
            hostTurn: gameManager.onlineRoomList[data.payload.game].hostTurn,
            opponentGhostBoard: gameManager.onlineRoomList[data.payload.game].host.ghostBoard,
            opponentName: gameManager.onlineRoomList[data.payload.game].host.name
          })
          io.to(data.payload.game).emit('updateGame', {
            opponentName: data.payload.user,
            message: `${data.payload.user} has joined the game.`
          })
        } else if (data.type === 'Computer') {

        }
      })


      socket.on('attack', data => {
        // let gameOver = false;
        console.log('attaack data', data)
        if (gameManager.onlineRoomList[data.game].host.name === data.user && gameManager.onlineRoomList[data.game].currentTurn === data.user) {
          gameManager.onlineRoomList[data.game].host.attack(gameManager.onlineRoomList[data.game].opponent, data.row, data.col, io, data.game)
          gameManager.onlineRoomList[data.game].currentTurn = gameManager.onlineRoomList[data.game].opponent.name
        } else if (gameManager.onlineRoomList[data.game].opponent.name === data.user && gameManager.onlineRoomList[data.game].currentTurn === data.user) {
          gameManager.onlineRoomList[data.game].opponent.attack(gameManager.onlineRoomList[data.game].host, data.row, data.col, io, data.game)
          gameManager.onlineRoomList[data.game].currentTurn = gameManager.onlineRoomList[data.game].host.name
        }
      })


    })
  }
}
