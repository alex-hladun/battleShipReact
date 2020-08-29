import React from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../store/types'
import './MainGame.css'
import BoardContainer from './Game/BoardContainer'
import ShipDashboard from './Game/ShipDashboard'
import GameLog from './Game/GameLog';
import { transitionToLobby } from '../../reducers/viewModeSlice'
import { resetGameState } from '../../reducers/gameStateSlice'
import { resetCellState } from '../../reducers/cellStateSlice'
import { leaveGame } from '../../modules/websocket'

export default function GameContainer() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
  const dispatch = useDispatch()

  const goToLobby = () => {
    // Socket message to leave the game
    dispatch(leaveGame({
      game: gameState.gameID,
    }))
    dispatch(resetGameState())
    dispatch(resetCellState())
    dispatch(transitionToLobby())
  }

  return (

    <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
    {gameState.winner &&  
      <div id="game-over-banner" className="show">
        {gameState.winner} WINS!
      </div>
    }
      <div id="upper-info-bar">
        <div id="new-game-btn" className="info-banner info-box settings-button" onClick={goToLobby}>New Game</div>
        <div id="turn-indicator" className="info-box info-banner">{gameState.gameStatus}</div>
      </div>
      <div id="game-info-bar">
        <div className="game-info-bar-spacer"></div>
        <div id="player-above-label">{gameState.player.name} (you)</div>
        <div className="game-info-bar-spacer"></div>
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

