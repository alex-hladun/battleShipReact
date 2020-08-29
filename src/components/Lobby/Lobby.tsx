import React from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { transitionToSettings } from '../../reducers/viewModeSlice'
import { State } from '../../store/types'
import { joinGame } from '../../modules/websocket'

export default function Lobby() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
  const lobbyState = typedUseSlector(state => state.lobbyState)
  const dispatch = useDispatch()
  const joinLobbyGame = (game: any) => {

    dispatch(joinGame({
      type: 'Online',
      payload: {
        user: gameState.player.name,
        game
      }
    }))
  }

  const showSettings = () => {
    dispatch(transitionToSettings())
  }

  const gameListKeys = Object.keys(lobbyState.gameList)
  const gameList = gameListKeys.map((game: string, index) => {
    return (
      <div key={'lobby-div' + index}>
    <span key={'lobby-game' + index} className="info-banner info-box settings-button" onClick={() => joinLobbyGame(lobbyState.gameList[game].name)}>{lobbyState.gameList[game].name}</span>
    {/* <span>{lobbyState.gameList[game].host.name}</span> */}
    </div>
    )
  })

  return (
    <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <article className="info-box info-banner">BATTLESHIP</article>
      <article id="settings-box" className="info-box"><span className="settings-banner">Lobby</span>
        <div className="lobby-row">
          {(gameListKeys.length === 0) && <span className="settings-banner">No games</span>}
          {gameList}
        </div>
        <div id="setting-row2" className="setting-row">
          <span className="info-banner info-box settings-button" onClick={showSettings}>Create Game</span>
          {/* <span id="btn-play-cpu" className="info-banner info-box settings-button">Play Computer</span> */}
        </div>

      </article>
    </div>
  )

}