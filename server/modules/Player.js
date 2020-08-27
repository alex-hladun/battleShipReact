/* eslint-disable no-array-constructor */
class Player {
  constructor(name, shipList, boardSize) {
    this.name = name;
    this.shipList = shipList;
    this.totalHits = 0;
    this.totalShipTargets = 0;
    this.board = [];
    this.ghostBoard = [];    
    this.totalTargets();
    this.resetBoard(boardSize);
  }

  resetBoard(boardSize) {
    this.board = [];
    this.ghostBoard = [];
    for (const ship in this.shipList) {
      this.shipList[ship].hitCount = 0;
    }
    this.totalHits = 0;
    // Generates the board with specified rows and columns
    let row = new Array();
    for (let i = 0; i < boardSize; i++) {
      row.push("O");
    }
    for (let i = 0; i < boardSize; i++) {
      const rowD = [...row];
      console.log(rowD);
      this.board.push(rowD);
      this.ghostBoard.push(rowD);
    }
  }

  totalTargets () {
    console.log('Calling totalTargets')
    for (const ship in this.shipList) {
      this.totalShipTargets += this.shipList[ship].length;
    }
  };
 
  

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

  convertColToNum(col) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.indexOf(col.toLowerCase());
  }

  attack(enemy, targetRow, targetCol) {
    // const colID = this.convertColToNum(target.slice(0, 1));
    // const rowID = target.slice(1, target.length) - 1;
    const shotTarget = enemy.board[targetCol][targetCol];

    // let logMessage;

    switch (shotTarget) {
    case 'O':
      enemy.board[targetRow][targetCol] = "M";
      enemy.ghostBoard[targetRow][targetCol] = "M";
      // logMessage = $(`<span>${this.name.toLocaleUpperCase()} fired at ${target.toLocaleUpperCase()}. <b>Miss!</b></span>`);
      // logMessage.appendTo($(`#game-log`));
      // $('#game-log').scrollTop(0);
      // $(`#${enemy.name}${target}`).removeClass(`computer-cell game-cell`).addClass(`cell-shot-miss hover-blue`);
      // $(`#${enemy.name}${target}`).unbind('mouseenter');
      return false;
    case 'X':
      return false;
    case "M":
      console.log(this)
      return false;
    default:
      // Adds red to ship indicator.
      // $(`#${enemy.name}${shotTarget}${enemy.shipList[shotTarget].hitCount}`).addClass('cell-ship-strike');

      // This will assign the ship to the ghost board, so that the ship dashboard can update properly.
      enemy.shipList[shotTarget].hitCount++;
      this.totalHits ++;
      enemy.ghostBoard[targetRow][targetCol] = shotTarget;
      enemy.board[targetRow][targetCol] = "X";

      // logMessage = $(`<span>${this.name.toLocaleUpperCase()} fired at ${target.toLocaleUpperCase()}. <b>Hit!</b></span>`);
      // logMessage.appendTo($(`#game-log`));

      // Sunk ship Message
      if (enemy.shipList[shotTarget].hitCount === enemy.shipList[shotTarget].length) {
        // logMessage = $(`<span>${this.name.toLocaleUpperCase()} <b>SUNK</b> ${enemy.name.toLocaleUpperCase()}'s  <b>${enemyShot.toLocaleUpperCase()}!!</b></span>`);
        // logMessage.appendTo($(`#game-log`));
      }
      // $('#game-log').scrollTop(0);

      // $(`#${enemy.name}${target}`).removeClass(`computer-cell game-cell`).addClass(`cell-ship-strike hover-red`);
      // $(`#${enemy.name}${target}`).unbind('mouseout');

      if (this.totalHits === this.totalShipTargets) {
        return true
        // $('#game-over-banner').text(`${this.name.toLocaleUpperCase()} Wins!`);
        // $('#game-over-banner').addClass("show");
        // $(".computer-cell").unbind();
        // this.playerTurn = "game-over";
      }
      return false;
    }
  }
  


}

module.exports = {
  Player
}