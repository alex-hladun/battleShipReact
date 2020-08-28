import React from 'react';
import BoardCell from './BoardCell'

export default function BoardRow({boardSize, row, ownBoard}: any) {
  const boardCells = Array(boardSize).fill('').map((cell: any, index) => {
    return (
      <BoardCell row={row} col={index + 1} boardSize={boardSize} ownBoard={ownBoard}/>
    )
  })

  return (
    <>
    {boardCells}
    </>
  )

}

