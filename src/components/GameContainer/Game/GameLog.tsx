import React from 'react';
import ScrollableFeed from 'react-scrollable-feed'

export default function GameLog({messages}: any) {
  const gameMessages = messages.map((message: string) => {
    return (
    <div>{message}</div>
    )
  })

  return (
    <div id="game-log" className="info-box">
      <ScrollableFeed forceScroll={true}>
      {gameMessages}
      </ScrollableFeed>
    </div>
  )

}