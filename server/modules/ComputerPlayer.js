/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
const { Player } = require('./Player')

class ComputerPlayer extends Player {

  constructor(name, shipList, boardSize, difficulty) {
    super(name, shipList, boardSize, difficulty)
    this.shipList = shipList;
    this.potentialMoves = [];
    this.difficulty = difficulty;
    this.randomizeBoard();
  }

  getRandomCell() {
    let randCell = Math.floor(Math.random() * (this.boardSize));
    return randCell;
  }

  getRandomRow() {
    return Math.ceil(Math.random() * (this.boardSize)) - 1;
  }

  getRandomTarget() {
    const randCol = this.alphabet[this.getRandomCell()];
    const randrow = this.getRandomRow() + 1;
    return (randCol + randrow)
  }

  randomizeBoard() {
    for (const ship in this.shipList) {
      const randHz = (Math.floor(Math.random() * 2) === 0);
      this.shipList[ship].horizontal = randHz;
      const shipLen = this.shipList[ship].length;
      let row = this.getRandomRow();
      let col = this.getRandomCell();
      let validPlacement = this.checkEligible(row, col, this.shipList[ship]);
      while (!validPlacement) {
        row = this.getRandomRow();
        col = this.getRandomCell();
        validPlacement = this.checkEligible(row, col, this.shipList[ship]);
      }

      if (this.shipList[ship].horizontal) {
        for (let i = 0; i < shipLen; i++) {
          this.board[row][col + i] = Number(ship) + 1;
        }
      } else {
        for (let i = 0; i < shipLen; i++) {
          this.board[row + i][col] = Number(ship) + 1;
        }
      }
    }
  }

  checkEligible(row, col, ship) {
    const shipLen = ship.length;
    if (ship.horizontal) {
      for (let i = 0; i < shipLen; i++) {
        if (this.board[row][col + i] !== "O" || this.board[row][col + i] === undefined) {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < shipLen; i++) {
        // Checks that cell exists and is open.
        if (!this.board[row + i]) {
          return false;
        }
        if (this.board[row + i][col] !== "O" || this.board[row + i][col] === undefined) {
          return false;
        }
      }
      return true;
    }
  }

  generateComputerMoves(enemy) {
    console.log('computer diff', this.difficulty)
    for (const row in enemy.board) {
      for (const col in enemy.board[row]) {
        if (enemy.board[row][col] !== 'O') {
          const colID = this.alphabet[col];
          const rowID = Number(row) + 1;
          this.potentialMoves.push(colID + rowID);
          console.log(this.potentialMoves)
          switch (this.difficulty) {
            case 0:
              this.potentialMoves.push(this.getRandomTarget());
            case 1:
              this.potentialMoves.push(this.getRandomTarget());
            case 2:
              this.potentialMoves.push(this.getRandomTarget());
              break;
          }
        }
      }
    }
    console.log('Computer random moves', this.potentialMoves)
  }

  convertColToNum(col) {
    return this.alphabet.indexOf(col);
  }

  computerAttack(enemy, io, gameID) {
    const randIndex = Math.round(Math.random() * (this.potentialMoves.length - 1));
    const randMove = this.potentialMoves.splice(randIndex, 1);
    const colID = this.convertColToNum(randMove[0].slice(0, 1));
    const rowID = randMove[0].slice(1, randMove[0].length) - 1;

    let validShot = this.attack(enemy, rowID, colID, io, gameID);
    while (!validShot) {
      validShot = this.attack(enemy, this.getRandomRow(), this.getRandomCell(), io, gameID);
    }
  }


}

module.exports = {
  ComputerPlayer
}