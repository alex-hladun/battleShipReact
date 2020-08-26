class Player {
  constructor(name) {
    this.name = name;
    this.totalHits = 0;
    this.totalShipTargets = 0;
    this.board = [];
    this.totalTargets = function () {
      for (const ship in this.shipList) {
        this.host.totalShipTargets += this.host.shipList[ship].length;
      }
    };
    this.resetBoard();
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

  attack(enemy, target) {
    const colID = this.convertColToNum(target.slice(0, 1));
    const rowID = target.slice(1, target.length) - 1;
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

module.exports = {
  Player
}