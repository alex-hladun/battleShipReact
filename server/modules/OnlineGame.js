const { Player } = require('./Player')

class OnlineGame {
  constructor(gameName, boardSize, hostName, shipList) {
    this.name = gameName;
    this.boardSize = boardSize
    this.host = new Player(hostName, [...shipList], boardSize)
    this.hostReady = false;
    this.currentTurn = null;
    this.opponent = new Player('waiting', JSON.parse(JSON.stringify(shipList)), boardSize);
    this.opponentReady = false;
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