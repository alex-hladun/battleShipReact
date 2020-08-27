const { Player } = require('./Player')

class OnlineGame {
  constructor(gameName, boardSize, hostName, shipList) {
    this.name = gameName;
    this.boardSize = boardSize
    this.host = new Player(hostName, shipList, boardSize)
    this.hostReady = false;
    this.currentTurn = null;
    this.opponent = null;
    this.opponentReady = false;
  }

  sendHostUpdate(io) {
    console.log('host update', {user: this.host.name,
    board: this.host.ghostBoard,
    currentTurn: this.currentTurn})
    io.to(this.name).emit('ghostBoardUpdate', {
      user: this.host.name,
      board: this.host.ghostBoard,
      currentTurn: this.currentTurn
    })
  }
  sendOpponentUpdate(io) {
    io.to(this.name).emit('ghostBoardUpdate', {
      user: this.opponent.name,
      board: this.opponent.ghostBoard,
      currentTurn: this.currentTurn
    })
  }
}

module.exports = {
  OnlineGame
}