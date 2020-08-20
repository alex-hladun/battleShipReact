/* eslint-disable no-fallthrough */
interface Ship {
  length: number;
  horizontal: Boolean;
  hitCount: number;
}

interface ShipList {
  [name: string]: Ship
}

export default class Board {
  // Initial Types
  name: string;
  boardSize: number;
  board: Array<Array<any>>;
  moveHistory: Array<string>;
  playerTurn: Boolean;
  shipList: ShipList;
  shotsPerTurn: number;
  difficulty: number;
  diffArray: Array<string>
  totalTargets: Function;
  totalShipTargets: number;
  totalHits: number;
  potentialMoves: Array<string>

  constructor(name: string, boardSize: number, ) {
    this.name = name;
    this.boardSize = boardSize;
    this.board = [];
    this.resetBoard();
    this.moveHistory = [];
    this.playerTurn = false;
    this.shipList = {
      'Carrier': {
        length: 5,
        horizontal: true,
        hitCount: 0
      },
      'Battleship': {
        length: 4,
        horizontal: true,
        hitCount: 0
      },
      'Cruiser': {
        length: 3,
        horizontal: true,
        hitCount: 0
      },
      'Submarine': {
        length: 3,
        horizontal: true,
        hitCount: 0
      },
      'Destroyer': {
        length: 2,
        horizontal: true,
        hitCount: 0
      }
    };
    this.shotsPerTurn = 1;
    this.difficulty = 0;
    this.diffArray = ['easy', 'medium', 'hard', 'impossible'];
    this.totalShipTargets = 0;
    this.totalTargets = function() {
      for (const ship in this.shipList) {
        this.totalShipTargets += this.shipList[ship].length;
      }
    };
    this.totalHits = 0;
    this.potentialMoves = [];
  }

  getRandomCell() {
    let randCell = "";
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let alpha = Math.round(Math.random() * (this.boardSize - 1));
    let num = Math.ceil(Math.random() * (this.boardSize));
    randCell += alphabet[alpha] + num;

    return randCell;
  }

  checkEligible(cell: any, ship: Ship) {
    const colID = this.convertColToNum(cell.slice(0, 1));
    const rowID: number = cell.slice(1, cell.length) - 1;
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

  randomizeBoard() {
    for (const ship in this.shipList) {
      const randHz = (Math.floor(Math.random() * 2) === 0);
      this.shipList[ship].horizontal = randHz;
      const shipLen = this.shipList[ship].length;
      let cell: any = this.getRandomCell();
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

  }
  resetBoard() {
    this.board = [];
    for (const ship in this.shipList) {
      this.shipList[ship].hitCount = 0;
    }
    this.totalHits = 0;
    this.potentialMoves = [];
    // Generates the board with specified rows and columns
    let row = [];
    for (let i = 0; i < this.boardSize; i++) {
      row.push("O");
    }
    for (let i = 0; i < this.boardSize; i++) {
      const rowD = [...row];
      this.board.push(rowD);
    }
  }

  generateComputerMoves(enemy : Board) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (const row in enemy.board) {
      for (const col in enemy.board[row]) {
        if (enemy.board[row][col] !== 'O') {
          const colID = alphabet[col];
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
  }

  convertColToNum(col: string) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.indexOf(col.toLowerCase());
  }

  computerAttack(target: Board) {
    const randIndex = Math.round(Math.random() * (this.potentialMoves.length - 1));
    const randMove = this.potentialMoves.splice(randIndex, 1);
    let validShot = this.attack(target, randMove[0]);
    while (!validShot) {
      validShot = this.attack(target, this.getRandomCell());
    }
  }

  attack(enemy: Board, target: any) {
    const colID = this.convertColToNum(target.slice(0, 1));
    const rowID: number = target.slice(1, target.length) - 1;
    const enemyShot = enemy.board[rowID][colID];

    // let logMessage;

    switch (enemyShot) {
    case 'O':
      enemy.board[rowID][colID] = "M";
      // logMessage = $(`<span>${this.name.toLocaleUpperCase()} fired at ${target.toLocaleUpperCase()}. <b>Miss!</b></span>`);
      // logMessage.appendTo($(`#game-log`));
      // $('#game-log').scrollTop(0);
      // $(`#${enemy.name}${target}`).removeClass(`computer-cell game-cell`).addClass(`cell-shot-miss hover-blue`);
      // $(`#${enemy.name}${target}`).unbind('mouseenter');
      return true;
    case 'X':
      return false;
    case "M":
      console.log(this)
      return false;
    default:
      // Adds red to ship indicator.
      // $(`#${enemy.name}${enemyShot}${enemy.shipList[enemyShot].hitCount}`).addClass('cell-ship-strike');
      enemy.shipList[enemyShot].hitCount++;
      this.totalHits ++;
      enemy.board[rowID][colID] = "X";

      // logMessage = $(`<span>${this.name.toLocaleUpperCase()} fired at ${target.toLocaleUpperCase()}. <b>Hit!</b></span>`);
      // logMessage.appendTo($(`#game-log`));

      // Sunk ship Message
      if (enemy.shipList[enemyShot].hitCount === enemy.shipList[enemyShot].length) {
        // logMessage = $(`<span>${this.name.toLocaleUpperCase()} <b>SUNK</b> ${enemy.name.toLocaleUpperCase()}'s  <b>${enemyShot.toLocaleUpperCase()}!!</b></span>`);
        // logMessage.appendTo($(`#game-log`));
      }
      // $('#game-log').scrollTop(0);

      // $(`#${enemy.name}${target}`).removeClass(`computer-cell game-cell`).addClass(`cell-ship-strike hover-red`);
      // $(`#${enemy.name}${target}`).unbind('mouseout');

      if (this.totalHits === this.totalShipTargets) {
        // $('#game-over-banner').text(`${this.name.toLocaleUpperCase()} Wins!`);
        // $('#game-over-banner').addClass("show");
        // $(".computer-cell").unbind();
        // this.playerTurn = "game-over";
      }
      return true;
    }
  }
}