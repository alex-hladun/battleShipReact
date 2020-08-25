class OnlineGame {
  constructor(name, boardSize, host) {
    this.name = name;
    this.boardSize = boardSize
    this.host = host
    this.hostTurn = null;
  }
}

module.exports={
  OnlineGame
}