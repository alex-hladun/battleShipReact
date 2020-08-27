import React, { useEffect, Component } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../../store/types'
import { setActiveCell, increaseShipIndex } from '../../../reducers/cellStateSlice'
import { placeShip } from '../../../reducers/gameStateSlice'
const classNames = require('classnames');

export default React.memo(function BoardCell({ row, col, boardSize, ownBoard }: any) {

  
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const cellState = typedUseSlector(state => state.cellState)
  const gameState = typedUseSlector(state => state.gameState)
  const dispatch = useDispatch()

  let cellClasses;
  // console.log(ownBoard)

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
  if (!ownBoard) {
    cellClasses = classNames('game-cell', 'player-cell', 'hover-dk-green', {
      'cell-ship-strike': (gameState.opponent.ghostBoard[row-1][col-1] !== 'M' && gameState.opponent.board[row-1][col-1] !== 'O'),
      'cell-shot-miss': (gameState.opponent.ghostBoard[row-1][col-1] === 'M')
    })
  } else if (cellState.hz && gameState.gameStatus === 'Place your ships') {
    // (cellState.col + cellState.shipLen <= boardSize + 1)
    cellClasses = classNames('game-cell', 'player-cell', {
      'cell-selected': (gameState.player.board[row - 1][col - 1] !==  'O') || (row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && checkEligible(cellState.row - 1, cellState.col - 1)),
      'cell-ship-strike': row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && !checkEligible(cellState.row - 1, cellState.col - 1)
    });
  } else if (gameState.gameStatus === 'Place your ships') {
    cellClasses = classNames('game-cell', 'player-cell', {
      'cell-selected': (gameState.player.board[row - 1][col - 1] !==  'O') || (col === cellState.col && row < cellState.row + cellState.shipLen && row >= cellState.row && checkEligible(cellState.row - 1, cellState.col - 1)),
      'cell-ship-strike': col === cellState.col && row < cellState.row + cellState.shipLen && row >= cellState.row && !checkEligible(cellState.row - 1, cellState.col - 1)
    });
  } else {
    cellClasses = classNames('game-cell', 'player-cell', {
      'cell-selected': (gameState.player.board[row - 1][col - 1] !==  'O'),
      'cell-ship-strike': (gameState.player.board[row - 1][col - 1] ===  'X')
    });
  }

  const mouseHover = (row: number, col: number) => {
    dispatch(setActiveCell({
      row,
      col
    }))
  }

  const handleShipPlacement = (row: number, col: number) => {
    if (checkEligible(row -1, col -1) && gameState.gameStatus === 'Place your ships') {
      // Place the ship on the board
      // Dispatch row, col, ship length, shipID, and hz
      dispatch(placeShip({
        hz: cellState.hz,
        col: col - 1,
        row: row -1,
        shipLen: cellState.shipLen,
        shipID: cellState.shipIndex + 1
      }))

      // Increase the ship index
      dispatch(increaseShipIndex())
    }
  }

  return (
    <div className={cellClasses} onMouseOver={() => mouseHover(row, col)} onClick={() => handleShipPlacement(row,col)}></div>
  )

})

