import React from 'react';
// import '../Settings/Settings.css '
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { transitionToSettings } from '../../reducers/viewModeSlice'
import { State, LobbyState, LobbyItem } from '../../store/types'
import { joinGame } from '../../modules/websocket'


// const Player = new Board('Player', 10);


export default function Lobby() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
  const lobbyState = typedUseSlector(state => state.lobbyState)
  // const viewModeState = typedUseSlector(state => state.viewState)
  const dispatch = useDispatch()

  const joinGame = (game: any) => {

    dispatch(joinGame({
      type: 'online',
      payload: {
        user: gameState.player.name,
        game
      }
    }))

    // Set up socket handlers for these instead. 

    // dispatch(resetBoard())
    // dispatch(transitionToGame())
  }


  const showSettings = () => {
    dispatch(transitionToSettings())
  }

  console.log('lobbystate keys', Object.keys(lobbyState.gameList))
  const gameListKeys = Object.keys(lobbyState.gameList)

  const gameList = gameListKeys.map((game: string, index) => {
    console.log('lobbystate gamelist', lobbyState.gameList[game]);
    console.log('game', game)
    return (
    <span className="info-banner info-box settings-button" onClick={joinGame}></span>
    )
  })

  return (
    <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <article className="info-box info-banner">BATTLESHIP</article>
      <article id="settings-box" className="info-box"><span className="settings-banner">Lobby</span>
        <div id="setting-row1" className="setting-row">
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