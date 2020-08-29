/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
const { Player } = require('./Player')

class ComputerPlayer extends Player {

  constructor(name, shipList, boardSize, difficulty) {
    super(name, shipList, boardSize)
    this.shipList = shipList;
    this.potentialMoves = [];
    this.randomizeBoard();
  }

  getRandomCell() {
    let randCell = "";
    let alpha = Math.round(Math.random() * (this.boardSize - 1));
    let num = Math.ceil(Math.random() * (this.boardSize));
    randCell += this.alphabet[alpha] + num;

    return randCell;
  }

  randomizeBoard() {
    console.log('Computer before random', this.board)
    for (const ship in this.shipList) {
      const randHz = (Math.floor(Math.random() * 2) === 0);
      this.shipList[ship].horizontal = randHz;
      const shipLen = this.shipList[ship].length;
      let cell = this.getRandomCell();
      let validPlacement = this.checkEligible(cell, this.shipList[ship]);
      while (!validPlacement) {
        cell = this.getRandomCell();
        validPlacement = this.checkEligible(cell, this.shipList[ship]);
      }

      const colID = this.convertColToNum(cell.slice(0, 1));
      const rowID = cell.slice(1, 2) - 1;

      if (this.shipList[ship].horizontal) {
        for (let i = 0; i < shipLen; i++) {
          this.board[rowID][colID + i] = ship;
        }
      } else {
        for (let i = 0; i < shipLen; i++) {
          this.board[rowID + i][colID] = ship;
        }
      }
    }
    console.log('Random computer board', this.board)
  }

  checkEligible(cell, ship) {
    const colID = this.convertColToNum(cell.slice(0, 1));
    const rowID = cell.slice(1, cell.length) - 1;
    const shipLen = ship.length;

    if (ship.horizontal) {
      for (let i = 0; i < shipLen; i++) {
        if (this.board[rowID][colID + i] !== "O" || this.board[rowID][colID + i] === undefined) {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < shipLen; i++) {
        // Checks that cell exists and is open.
        if (!this.board[rowID + i]) {
          return false;
        }
        if (this.board[rowID + i][colID] !== "O" || this.board[rowID + i][colID] === undefined) {
          return false;
        }
      }
      return true;
    }
  }


  generateComputerMoves(enemy) {
    for (const row in enemy.board) {
      for (const col in enemy.board[row]) {
        if (enemy.board[row][col] !== 'O') {
          const colID = this.alphabet[col];
          const rowID = Number(row) + 1;
          this.potentialMoves.push(colID + rowID);
          switch (enemy.difficulty) {
            case 0:
              this.potentialMoves.push(this.getRandomCell());
            case 1:
              this.potentialMoves.push(this.getRandomCell());
              this.potentialMoves.push(this.getRandomCell());
            case 2:
              this.potentialMoves.push(this.getRandomCell());
              this.potentialMoves.push(this.getRandomCell());
              break;
          }
        }
      }
    }
    console.log('Computer random moves', this.potentialMoves)
  }

  convertColToNum(col) {
    return this.alphabet.indexOf(col.toLowerCase());
  }

  computerAttack(target) {
    const randIndex = Math.round(Math.random() * (this.potentialMoves.length - 1));
    const randMove = this.potentialMoves.splice(randIndex, 1);
    let validShot = this.attack(target, randMove[0]);
    while (!validShot) {
      validShot = this.attack(target, this.getRandomCell());
    }
  }


}

module.exports = {
  ComputerPlayer
}