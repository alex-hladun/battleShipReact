import React from 'react';
import { useDispatch } from 'react-redux'
import { transitionToLobby } from '../../reducers/viewModeSlice'
import { resetGameState } from '../../reducers/gameStateSlice'
import { resetCellState } from '../../reducers/cellStateSlice';

export default function Disconnect() {
  const dispatch = useDispatch()

  const goToLobby = () => {
    dispatch(resetGameState())
    dispatch(resetCellState())
    dispatch(transitionToLobby())
  }

  return (

    <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div id="game-over-banner" className="show">
        Disconnected!
      </div>
      <div id="new-game-btn" className="info-banner info-box settings-button" onClick={goToLobby}>Return to Lobby</div>
    </div>

  )
}

