const { Player } = require('./Player')

class ComputerPlayer extends Player {
  
  constructor(name, shipList) {
    super(name, shipList)
    this.potentialMoves = [];
    
  }

}

module.exports = {
  ComputerPlayer
}