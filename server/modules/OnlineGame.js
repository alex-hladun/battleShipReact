const { Player } = require('./Player')

class OnlineGame {
  constructor(gameName, hostName, boardSize) {
    this.name = gameName;
    this.boardSize = boardSize
    this.host = new Player(hostName)
    this.hostTurn = null;
  }
}

module.exports = {
  OnlineGame
}