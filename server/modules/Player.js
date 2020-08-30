
/* eslint-disable no-array-constructor */
class Player {
  constructor(name, shipList, boardSize, difficulty = 0) {
    this.name = name;
    this.boardSize = boardSize;
    this.shipList = [...shipList];
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
      this.board.push(rowD);
    }
  }

  totalTargets() {
    for (const ship in this.shipList) {
      this.totalShipTargets += this.shipList[ship].length;
    }
  };

  attack(enemy, targetRow, targetCol, io, gameID) {
    // Where targetRow/Col are the index
    const shotTarget = enemy.board[targetRow][targetCol];
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
      case undefined:
        return false;
      default:
        console.log('shot target', shotTarget)
        enemy.shipList[shotTarget - 1].hitCount++;
        this.totalHits++;
        
        console.log("Player -> attack -> this.totalHits", this.totalHits)
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
        console.log('enemy shiplist', enemy.shipList)
        console.log(`${this.name} shiplist`, this.shipList)
        
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
        enemy.board[targetRow][targetCol] = "X";
        return true;
    }
  }
}

module.exports = {
  Player
}