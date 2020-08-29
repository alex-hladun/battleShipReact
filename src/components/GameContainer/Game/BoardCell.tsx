import React from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../../store/types'
import { setActiveCell, increaseShipIndex } from '../../../reducers/cellStateSlice'
import { placeShip } from '../../../reducers/gameStateSlice'
import { attackEnemy } from '../../../modules/websocket'

const classNames = require('classnames');

export default React.memo(function BoardCell({ row, col, boardSize, ownBoard }: any) {

  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const cellState = typedUseSlector(state => state.cellState)
  const gameState = typedUseSlector(state => state.gameState)
  const dispatch = useDispatch()

  let cellClasses;

  const checkEligible = (row: number, col: number) => {
    if (cellState.hz) {
      for (let i = 0; i < cellState.shipLen; i++) {
        if (gameState.player.board[row][col + i] !== "O" || gameState.player.board[row][col + i] === undefined) {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < cellState.shipLen; i++) {
        // Checks that cell exists and is open.
        if (!gameState.player.board[row + i]) {
          return false;
        }
        if (gameState.player.board[row + i][col] !== "O" || gameState.player.board[row + i][col] === undefined) {
          return false;
        }
      }
      return true;
    }
  }

  // Assign colors to cells if ship is eligible or not
  if (gameState.gameStatus === 'Place your ships') {
    if (ownBoard) {
      if (cellState.hz) {
        cellClasses = classNames('game-cell', 'player-cell', {
          'cell-ship-present': (gameState.player.board[row - 1][col - 1] !== 'O'),
          'cell-selected': (row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && checkEligible(cellState.row - 1, cellState.col - 1)),
          'cell-ship-strike': row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && !checkEligible(cellState.row - 1, cellState.col - 1)
        });
      } else {
        cellClasses = classNames('game-cell', 'player-cell', {
          'cell-ship-present': (gameState.player.board[row - 1][col - 1] !== 'O'),
          'cell-selected': (col === cellState.col && row < cellState.row + cellState.shipLen && row >= cellState.row && checkEligible(cellState.row - 1, cellState.col - 1)),
          'cell-ship-strike': col === cellState.col && row < cellState.row + cellState.shipLen && row >= cellState.row && !checkEligible(cellState.row - 1, cellState.col - 1)
        });
      }
    } else {
      cellClasses = classNames('game-cell', 'player-cell')
    }
  } else {
    if (ownBoard) {
      cellClasses = classNames('game-cell', 'player-cell', {
        'cell-ship-present': (gameState.player.board[row - 1][col - 1] !== 'O'),
        'cell-ship-strike': (gameState.player.board[row - 1][col - 1] === 'X'),
        'cell-shot-miss': (gameState.player.board[row - 1][col - 1] === 'M')
      });
    } else {
      cellClasses = classNames('game-cell', 'player-cell', {
        'cell-ship-strike': (gameState.opponent.board[row - 1][col - 1] === 'X'),
        'cell-shot-miss': (gameState.opponent.board[row - 1][col - 1] === 'M'),
        'cell-selected': (gameState.opponent.board[row - 1][col - 1] === 'O' && row === cellState.row && col === cellState.col)
      })
    }
  }

  const mouseHover = (row: number, col: number) => {
    if (gameState.gameStatus === 'Place your ships') {
      dispatch(setActiveCell({
        row,
        col
      }))
    } else if (!ownBoard) {
      dispatch(setActiveCell({
        row,
        col
      }))
    }
  }

  const handleCellClick = (row: number, col: number) => {
    if (checkEligible(row - 1, col - 1) && gameState.gameStatus === 'Place your ships') {
      // Place the ship on the board
      // Dispatch row, col, ship length, shipID, and hz
      dispatch(placeShip({
        hz: cellState.hz,
        col: col - 1,
        row: row - 1,
        shipLen: cellState.shipLen,
        shipID: cellState.shipIndex + 1
      }))

      // Increase the ship index
      dispatch(increaseShipIndex())
    } else if (!ownBoard && gameState.gameStatus === 'Your Turn' && gameState.opponent.board[row - 1][col - 1] === 'O') {
      dispatch(attackEnemy({
        game: gameState.gameID,
        col: col - 1,
        row: row - 1,
        user: gameState.player.name
      }))

    }
  }

  return (
    <div data-testid="test-board-cell" className={cellClasses} onMouseOver={() => mouseHover(row, col)} onClick={() => handleCellClick(row, col)}></div>
  )

})

