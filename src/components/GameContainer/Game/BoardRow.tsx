import React, { useState, useEffect } from 'react';
import BoardCell from './BoardCell'

export default function BoardRow({boardSize, row, ownBoard}: any) {

  // console.log(boardSize)

  // console.log(row)
  


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

