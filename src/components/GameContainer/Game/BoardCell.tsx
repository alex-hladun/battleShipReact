import React, { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../../store/types'
import { setActiveCell } from '../../../reducers/cellStateSlice'
const classNames = require('classnames');

export default function BoardCell({ row, col, boardSize }: any) {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const cellState = typedUseSlector(state => state.cellState)
  const dispatch = useDispatch()


  let cellClasses;

  if (cellState.hz) {
    cellClasses = classNames('game-cell', 'player-cell', {
      'cell-selected': row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && (cellState.col + cellState.shipLen <= boardSize + 1),
      'cell-ship-strike': row === cellState.row && col < cellState.col + cellState.shipLen && col >= cellState.col && (cellState.col + cellState.shipLen > boardSize)
    });
  } else {
    cellClasses = classNames('game-cell', 'player-cell', {
      'cell-selected': false,
      'cell-ship-strike': false
    });
  }


  // const checkEligible = (cell, ship) {
  //   const colID = this.convertColToNum(cell.slice(0, 1));
  //   const rowID = cell.slice(1, cell.length) - 1;
  //   const shipLen = ship.length;

  //   if (ship.horizontal) {
  //     for (let i = 0; i < shipLen; i++) {
  //       if (this.board[rowID][colID + i] !== "O" || this.board[rowID][colID + i] === undefined) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   } else {
  //     for (let i = 0; i < shipLen; i++) {
  //       // Checks that cell exists and is open.
  //       if (!this.board[rowID + i]) {
  //         return false;
  //       }
  //       if (this.board[rowID + i][colID] !== "O" || this.board[rowID + i][colID] === undefined) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   }
  // }

  // console.log(row)
  // console.log(col)

  const mouseHover = (row: number, col: number) => {
    dispatch(setActiveCell({
      row,
      col
    }))
  }

  return (
    <div className={cellClasses} id="playera1" onMouseOver={() => mouseHover(row, col)}></div>
  )

}

