import React, { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../store/types'
import './MainGame.css'

function GameContainer() {

  const dispatch = useDispatch()

  return (

    <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div id="upper-info-bar">
        <div id="new-game-btn" className="info-banner info-box settings-button">New Game</div>
        <div id="turn-indicator" className="info-box info-banner">Player Turn!</div>
      </div>


      <div id="game-info-bar">
        <div id="player-above-label">Player</div>
        <div id="cpu-above-label">Computer</div>
      </div>

      <div id="all-info-container">
        <div id="player-ship-dashboard" className="ship-dashboard">
          <div className="ship-row">
            <div className="ship-blocks" id="playership1"></div>
          </div>
        </div>

        <div id="player-board">
          <div className="top-row-label" id="player-board-row-label">
            <div className="cell-row-label">A</div>
            <div className="cell-row-label">A</div>
            <div className="cell-row-label">A</div>
          </div>
          <div className="middle-content">
            <div className="left-column-label">
              <div className="cell-row-label">1</div>
              <div className="cell-row-label">1</div>
              <div className="cell-row-label">1</div>
            </div>
            <div className="game-board">
              <div className="board-row-label">
                <div className="game-cell player-cell" id="playera1"></div>
                <div className="game-cell player-cell" id="playera1"></div>
                <div className="game-cell player-cell" id="playera1"></div>
                <div className="game-cell player-cell" id="playera1"></div>
                <div className="game-cell player-cell" id="playera1"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div id="game-log" className="info-box">
        <span><b>Welcome to BATTLESHIP!</b> Place your ships. Press 'R' to rotate.</span>
      </div>

    </div>

  )

}

export default GameContainer