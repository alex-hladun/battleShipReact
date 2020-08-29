
// export interface Ship {
//   name: string;
//   length: number;
//   horizontal: Boolean;
//   hitCount: number;
// }

// export interface Player {
//   name: string;
//   board: never[];
//   shipList: Array<Ship>
// }

const { OnlineGame } = require("./OnlineGame");
const { ComputerPlayer } = require('./ComputerPlayer')

class ComputerGame extends OnlineGame {
  constructor(gameName, boardSize, hostName, shipList, difficulty) {
    super(gameName, boardSize, hostName, shipList)
    this.difficulty = difficulty;
    this.opponent = new ComputerPlayer('Computer', shipList, boardSize, difficulty)
  }

}

module.exports= {
  ComputerGame
}