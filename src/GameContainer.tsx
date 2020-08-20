import React, { useState, useEffect } from 'react';
import './GameContainer.css'
import Settings from './components/Settings'


function GameContainer() {
  const [gameState, setGameState] = useState({
    boardSize: 10,
    difficulty: 1,
    diffArray: ['easy', 'medium', 'hard', 'impossible'],
    player: {
      name: '',
      board: [],
      shipList: [
        {
          name: 'Carrier',
          length: 5,
          horizontal: true,
          hitCount: 0
        },
        {
          name: 'Battleship',
          length: 4,
          horizontal: true,
          hitCount: 0
        },
        {
          name: 'Cruiser',
          length: 3,
          horizontal: true,
          hitCount: 0
        },
        {
          name: 'Submarine',
          length: 3,
          horizontal: true,
          hitCount: 0
        },
        {
          name: 'Destroyer',
          length: 2,
          horizontal: true,
          hitCount: 0
        }
      ]
    }
  ,
    opponent: {}
  })


useEffect(() => {

}, [])


return (
  <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
    This is sample text.
    <Settings {...gameState} />
  </div>)
}

export default GameContainer