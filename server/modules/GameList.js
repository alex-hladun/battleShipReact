const { OnlineGame } = require('./OnlineGame')
const { ComputerGame } = require('./ComputerGame')

class GameList {
  constructor(socket) {
    this.onlineRoomList = {};
    this.computerRoomList = {};
    this.socketDirectory = {}
    this.io = socket;
  }

  newOnlineRoom(gameName, boardSize, hostName, shipList) {
    let r = new OnlineGame(gameName, boardSize, hostName, shipList);
    this.onlineRoomList[r.name] = r;
    this.socketDirectory[hostName] = [r.name]
    return r;
  }

  newComputerRoom(gameName, boardSize, hostName, shipList, difficulty) {
    let r = new ComputerGame(gameName, boardSize, hostName, shipList, difficulty);
    this.computerRoomList[r.name] = r;
    this.socketDirectory[hostName] = [r.name]
    return r;
  }

  delRoom(name) {
    delete this.onlineRoomList[name]
  }

  // Sends the updated room list to all clients in the 'lobby'
  sendRoomUpdate(io) {
    const openRoomList = {}
    Object.keys(this.onlineRoomList).forEach(room => {
      if (this.onlineRoomList[room].opponent.name === 'waiting') {
        openRoomList[room.name] = this.onlineRoomList[room]
      }
    })
    console.log('this room list', openRoomList)
    io.to("lobby").emit("gameListUpdate", openRoomList);
  }

  sendGameMessage(io, gameID, logMessage) {
    io.to(gameID).emit("updateGame", {
      message: logMessage
    });
  }

  sendGameUpdate(io, gameID, logMessage, currentTurn, updatePlayer, ghostBoard, shipList) {
    io.to(gameID).emit("updateGame", {
      message: logMessage,
      currentTurn,
      ghostBoard: {
        user: updatePlayer,
        ghostBoard
      },
      shipList: {
        user: updatePlayer,
        shipList
      }
    });
  }
}

module.exports = {
  GameList
}