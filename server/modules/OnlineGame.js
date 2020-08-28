const { Player } = require('./Player')

class OnlineGame {
  constructor(gameName, boardSize, hostName, shipList) {
    this.name = gameName;
    this.boardSize = boardSize
    this.host = new Player(hostName, shipList, boardSize)
    this.hostReady = false;
    this.currentTurn = null;
    this.opponent = new Player('waiting', shipList, boardSize);
    this.opponentReady = false;
  }

  sendHostUpdate(io) {
    io.to(this.name).emit('updateGame', {
      ghostBoard: {
        user: this.host.name,
        board: this.host.ghostBoard 
      },
      currentTurn: this.currentTurn
    })
  }
  sendOpponentUpdate(io) {
    io.to(this.name).emit('updateGame', {
      ghostBoard: {
        user: this.opponent.name,
        board: this.opponent.ghostBoard 
      },
      currentTurn: this.currentTurn
    })
  }
  checkBothReady() {
    if (this.hostReady && this.opponentReady) {
      return true
    } else {
      return false
    }
  }
  startGame(io) {
    io.to(this.name).emit('startGame', {
      currentTurn: this.currentTurn
    })
  }
}

module.exports = {
  OnlineGame
}