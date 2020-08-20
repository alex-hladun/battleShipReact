import React from 'react';
import './GameContainer.css'
import Settings from './components/Settings'
import Board from './Board'


const player = new Board('Player', 10);
function GameContainer() {
  return (
    <div id="game-container" style={{display: 'flex', flexDirection: 'column'}}>
      This is sample text.
      <Settings />
      </div>)
}

export default GameContainer