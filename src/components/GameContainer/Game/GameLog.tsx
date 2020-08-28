import React from 'react';

export default function GameLog({messages}: any) {
  const gameMessages = messages.map((message: string) => {
    return (
    <span>{message}</span>
    )
  })

  return (
    <div id="game-log" className="info-box">
      {gameMessages}
    </div>
  )

}