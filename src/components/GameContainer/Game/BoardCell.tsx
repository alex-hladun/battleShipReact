import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../../store/types'
import { setActiveCell } from '../../../reducers/cellStateSlice'
const classNames = require('classnames');

export default function BoardCell({ row, col, boardSize }: any) {
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
  if (cellState.hz) {
    // (cellState.col + cellState.shipLen <= boardSize + 1)
    cellClasses = classNames('game-cell', 'player-cell', {
      'cell-selected': row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && checkEligible(cellState.row - 1, cellState.col - 1),
      'cell-ship-strike': row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && !checkEligible(cellState.row - 1, cellState.col - 1)
    });
  } else {
    cellClasses = classNames('game-cell', 'player-cell', {
      'cell-selected': col === cellState.col && row < cellState.row + cellState.shipLen && row >= cellState.row && checkEligible(cellState.row - 1, cellState.col - 1),
      'cell-ship-strike': col === cellState.col && row < cellState.row + cellState.shipLen && row >= cellState.row && !checkEligible(cellState.row - 1, cellState.col - 1)
    });
  }

  const mouseHover = (row: number, col: number) => {
    dispatch(setActiveCell({
      row,
      col
    }))
  }

  const handleShipPlacement = (row: number, col: number) => {
    if (checkEligible(row -1, col -1)) {
      // Place the ship on the board
      // Dispatch row, col, ship length and hz

      // Increase the ship index

    }
  }

  return (
    <div className={cellClasses} id="playera1" onMouseOver={() => mouseHover(row, col)} onClick={() => handleShipPlacement(row,col)}></div>
  )

}

