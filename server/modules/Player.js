
/* eslint-disable no-array-constructor */
class Player {
  constructor(name, shipList, boardSize, difficulty = 0) {
    this.name = name;
    this.shipList = shipList;
    this.totalHits = 0;
    this.totalShipTargets = 0;
    this.board = [];
    this.difficulty = difficulty;
    this.totalTargets();
    this.resetBoard(boardSize);
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  }

  resetBoard(boardSize) {
    this.board = [];
    this.potentialMoves = [];
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



  
  convertColToNum(col) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.indexOf(col.toLowerCase());
  }

  attack(enemy, targetRow, targetCol, io, gameID) {
    // Where targetRow/Col are the index
    const shotTarget = enemy.board[targetRow][targetCol];
    // console.log('enemy board', enemy.board)
    // console.log(`Shot at ${enemy.name} ${targetCol} - ${targetRow} - Result ${shotTarget}`)
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
        });
        return true;
        case 'X':
        return false;
          case "M":
        return false;
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
        if (enemy.shipList[shotTarget - 1].hitCount === enemy.shipList[shotTarget - 1].length) {
          io.to(gameID).emit('updateGame', {
            message: `${this.name.toLocaleUpperCase()} sunk ${enemy.name.toLocaleUpperCase()}'S ${enemy.shipList[shotTarget - 1].name}`
          })
        }
        if (this.totalHits === this.totalShipTargets) {
          io.to(gameID).emit('updateGame', {
            message: `${this.name.toLocaleUpperCase()} WINS!`,
            winner: this.name
          })
        }
      return true;
    }
  }



}

module.exports = {
  Player
}