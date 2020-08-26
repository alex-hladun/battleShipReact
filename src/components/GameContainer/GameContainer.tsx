import React, { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../store/types'
import './MainGame.css'
import BoardContainer from './Game/BoardContainer'
import ShipDashboard from './Game/ShipDashboard'
import GameLog from './Game/GameLog';

export default function GameContainer() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
  const dispatch = useDispatch()

  return (

    <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div id="upper-info-bar">
        <div id="new-game-btn" className="info-banner info-box settings-button">New Game</div>
        <div id="turn-indicator" className="info-box info-banner">{gameState.gameStatus}</div>
      </div>
      <div id="game-info-bar">
        <div id="player-above-label">{gameState.player.name} (you)</div>
        <div id="cpu-above-label">{gameState.opponent.name}</div>
      </div>
      <div id="all-info-container">
        <ShipDashboard player={gameState.player} ownBoard={true}/>
        <BoardContainer player={gameState.player} ownBoard={true}/>
        <ShipDashboard player={gameState.opponent}/>
        <BoardContainer player={gameState.opponent}/>
      </div>
      <GameLog messages={gameState.gameLog} />
    </div>
  )
}

