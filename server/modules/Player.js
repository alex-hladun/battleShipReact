const e = require("express");

/* eslint-disable no-array-constructor */
class Player {
  constructor(name, shipList, boardSize) {
    this.name = name;
    this.shipList = shipList;
    this.totalHits = 0;
    this.totalShipTargets = 0;
    this.board = [];
    this.totalTargets();
    this.resetBoard(boardSize);
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  }

  resetBoard(boardSize) {
    this.board = [];
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
      // console.log(rowD);
      this.board.push(rowD);
    }
  }

  totalTargets() {
    // console.log('Calling totalTargets')
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

  attack(enemy, targetRow, targetCol, io, gameID) {
    // Where targetRow/Col are the index
    const shotTarget = enemy.board[targetRow][targetCol];
    console.log('enemy board', enemy.board)
    console.log(`Shot at ${enemy.name} ${targetCol} - ${targetRow} - Result ${shotTarget}`)
    switch (shotTarget) {
      case 'O':
        enemy.board[targetRow][targetCol] = "M";
        io.to(gameID).emit('updateGame', {
          attackResults: {
            user: enemy.name,
            row: targetRow,
            col: targetCol,
            result: 'M'
          },
          currentTurn: enemy.name,
          message: `${this.name.toLocaleUpperCase()} fired at ${this.alphabet[targetCol].toLocaleUpperCase()}${targetRow + 1}. MISS!`
        })
        break;
      case 'X':
        break;
      case "M":
        break;
      default:
        // This will assign the ship to the ghost board, so that the ship dashboard can update properly.
        enemy.shipList[shotTarget - 1].hitCount++;
        this.totalHits++;

        enemy.board[targetRow][targetCol] = "X";

        io.to(gameID).emit('updateGame', {
          attackResults: {
            user: enemy.name,
            row: targetRow,
            col: targetCol,
            result: 'X'
          },
          currentTurn: enemy.name,
          message: `${this.name.toLocaleUpperCase()} fired at ${this.alphabet[targetCol].toLocaleUpperCase()}${targetRow + 1}. HIT!`,
          shipUpdate: {
            user: enemy.name,
            shipIndex: shotTarget - 1
          }
        })


        // Sunk ship Message
        if (enemy.shipList[shotTarget].hitCount === enemy.shipList[shotTarget - 1].length) {
          // logMessage = $(`<span>${this.name.toLocaleUpperCase()} <b>SUNK</b> ${enemy.name.toLocaleUpperCase()}'s  <b>${enemyShot.toLocaleUpperCase()}!!</b></span>`);
          // logMessage.appendTo($(`#game-log`));
        }
        // $('#game-log').scrollTop(0);

        // $(`#${enemy.name}${target}`).removeClass(`computer-cell game-cell`).addClass(`cell-ship-strike hover-red`);
        // $(`#${enemy.name}${target}`).unbind('mouseout');

        if (this.totalHits === this.totalShipTargets) {
          // return true
          // $('#game-over-banner').text(`${this.name.toLocaleUpperCase()} Wins!`);
          // $('#game-over-banner').addClass("show");
          // $(".computer-cell").unbind();
          // this.playerTurn = "game-over";
        }
      // return false;
    }
  }



}

module.exports = {
  Player
}