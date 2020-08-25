
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
class ComputerGame {
  constructor(name, boardSize, host, difficulty, ) {
    this.name = name;
    this.boardSize = boardSize;
    this.host = host;
    this.difficulty = difficulty;
    this.hostTurn = null;
  }

}
// module.exports= {
//   ComputerGame
// }