const { GameList } = require('./modules/GameList')
const socketIO = require('socket.io')

module.exports = {
  newSocketServer: function (http) {
    const io = socketIO(http)

    console.log('Starting socket server...')

    const gameManager = new GameList(io)

    io.sockets.on("connection", function (socket) {
      // Send roomList to each new participant
      socket.join("lobby");
      gameManager.sendRoomUpdate(io)

      socket.on('newGame', data => {
        socket.join(data.payload.gameName)
        gameManager.socketDirectory[socket.id] = data.payload.gameName;
        switch (data.type) {
          case 'online':
            gameManager.newOnlineRoom(data.payload.gameName, data.payload.boardSize, data.payload.username, data.payload.shipList);
            io.to(data.payload.gameName).emit("set_game_id", {
              gameID: data.payload.gameName
            })
            gameManager.sendRoomUpdate(io)
            break;
          case 'computer':
            console.log('diff in socketServer', data.payload.difficulty)
            gameManager.newComputerRoom(data.payload.gameName, data.payload.boardSize, data.payload.username, data.payload.shipList, data.payload.difficulty);
            io.to(data.payload.gameName).emit("set_game_id", {
              gameID: data.payload.gameName
            })
            io.to(data.payload.gameName).emit('updateGame', {
              opponentName: 'Computer',
              message: `Computer is ready.`
            })
            break;
          default:
            break;
        }
      })

      socket.on('joinGame', data => {
        if (data.type === 'Online') {
          gameManager.onlineRoomList[data.payload.game].opponent.name = data.payload.user;
          socket.join(data.payload.game)
          gameManager.socketDirectory[socket.id] = data.payload.game;

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

      socket.on('donePlacing', data => {
        console.log('done placing data', data)

        // Check if game is online or computer
        if (gameManager.onlineRoomList[data.game]) {
          if (gameManager.onlineRoomList[data.game].host.name === data.user) {
            gameManager.onlineRoomList[data.game].host.board = data.board;
            console.log('host board', gameManager.onlineRoomList[data.game].host.board)
            gameManager.onlineRoomList[data.game].hostReady = true;
            console.log(gameManager.onlineRoomList[data.game]);
          } else if (gameManager.onlineRoomList[data.game].opponent.name === data.user) {
            gameManager.onlineRoomList[data.game].opponent.board = data.board;
            console.log('opponent board', gameManager.onlineRoomList[data.game].opponent.board)
            gameManager.onlineRoomList[data.game].opponentReady = true;
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

          // In case of a computer game
        } else if (gameManager.computerRoomList[data.game]) {
          gameManager.computerRoomList[data.game].host.board = data.board;
          gameManager.computerRoomList[data.game].hostReady = true;
          gameManager.computerRoomList[data.game].opponent.generateComputerMoves(gameManager.computerRoomList[data.game].host);
          gameManager.computerRoomList[data.game].opponentReady = true;
          if (Math.random() > 0.5) {
            gameManager.computerRoomList[data.game].currentTurn = gameManager.computerRoomList[data.game].host.name
          } else {
            gameManager.computerRoomList[data.game].currentTurn = gameManager.computerRoomList[data.game].opponent.name
          }
          gameManager.sendGameMessage(io, data.game, `Both players ready! ${gameManager.computerRoomList[data.game].currentTurn} goes first.`)
          gameManager.computerRoomList[data.game].startGame(io);

          if (gameManager.computerRoomList[data.game].currentTurn === gameManager.computerRoomList[data.game].opponent.name) {
            gameManager.computerRoomList[data.game].opponent.computerAttack(gameManager.computerRoomList[data.game].host, io, data.game)
          }
        }
      })


      socket.on('leaveGame', data => {
        gameManager.delRoom(data.game)
        gameManager.socketDirectory[socket.id] = null;
        socket.leave(data.game)
        socket.join('lobby')
        gameManager.sendRoomUpdate(io)
        io.to(data.game).emit('disconnected', {
          game: data.game
        })
      })

      socket.on('disconnect', data => {
        if (gameManager.socketDirectory[socket.id]) {
          io.to(gameManager.socketDirectory[socket.id]).emit('disconnected', {
            game: gameManager.socketDirectory[socket.id]
          })
          gameManager.delRoom(gameManager.socketDirectory[socket.id]);
          gameManager.socketDirectory[socket.id] = null;
        }
        gameManager.sendRoomUpdate(io)
      })

      socket.on('attack', data => {
        if (gameManager.onlineRoomList[data.game]) {
          // Online Game
          if (gameManager.onlineRoomList[data.game].host.name === data.user && gameManager.onlineRoomList[data.game].currentTurn === data.user) {
            gameManager.onlineRoomList[data.game].host.attack(gameManager.onlineRoomList[data.game].opponent, data.row, data.col, io, data.game)
            gameManager.onlineRoomList[data.game].currentTurn = gameManager.onlineRoomList[data.game].opponent.name
          } else if (gameManager.onlineRoomList[data.game].opponent.name === data.user && gameManager.onlineRoomList[data.game].currentTurn === data.user) {
            gameManager.onlineRoomList[data.game].opponent.attack(gameManager.onlineRoomList[data.game].host, data.row, data.col, io, data.game)
            gameManager.onlineRoomList[data.game].currentTurn = gameManager.onlineRoomList[data.game].host.name
          }
        } else if (gameManager.computerRoomList[data.game]) {
          // Computer game
          gameManager.computerRoomList[data.game].host.attack(gameManager.computerRoomList[data.game].opponent, data.row, data.col, io, data.game)
          gameManager.computerRoomList[data.game].opponent.computerAttack( gameManager.computerRoomList[data.game].host, io, data.game)
        }
      })
    })
  }
}



