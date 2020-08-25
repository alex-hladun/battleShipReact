import React from 'react';
import './Settings.css'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { incrementBoardSize, decrementBoardSize, incrementDifficulty, decrementDifficulty, changeShipSize } from '../reducers/gameStateSlice'
import { startNewGame } from '../modules/websocket'
import { State, Ship } from '../store/types'

// const Player = new Board('Player', 10);


export default function Settings() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
  const socketState = typedUseSlector(state => state.socketState)
  const dispatch = useDispatch()

  const shipList = gameState.player.shipList.map((ship: Ship, index: number) => {
    return (<tr key={index}>
      <td>{ship.name}</td>
      <td className="ticker-box" onClick={() => handleShipSizeChange(index , -1)}>-</td>
      <td data-testid={`ship-length-${index}`}>{ship.length}</td>
      <td className="ticker-box" onClick={() => handleShipSizeChange(index , +1)} data-testid={`inc-ship-length-${index}`}>+</td>
    </tr>)
  })

  const handleBoardSizeIncrease = () => {
    if (gameState.boardSize >= 15) {
      console.log('Already 15')
    } else {
      dispatch(incrementBoardSize())
    }
  }
  const handleBoardSizeDecrease = () => {
    if (gameState.boardSize <= 5) {
      console.log('Already At Minimum of 5')
    } else {
      dispatch(decrementBoardSize())
    }
  }

  const handleDifficultyIncrease = () => {
    if (gameState.difficulty >= 3) {
      console.log('Difficulty already at 3')
    } else {
      dispatch(incrementDifficulty())
    }
  }
  const handleDifficultyDecrease = () => {
    if (gameState.difficulty <= 0) {
      console.log('Difficulty already at 0')
    } else {
      dispatch(decrementDifficulty())
    }
  }

  function handleShipSizeChange(shipID: number, delta: number) {
    if ((gameState.player.shipList[shipID].length + delta) >= 1 &&  (gameState.player.shipList[shipID].length + delta) < gameState.boardSize) {
      dispatch(changeShipSize({
        ship: shipID,
        delta: delta
      }))
    } else {
      console.log('Ship size must be > 1 and < boardSize')
    }
  }

  const playWithFriend = () => {
    dispatch(startNewGame({
      type: 'online',
      payload: {
        boardSize: gameState.boardSize,
        host: gameState.player
      }
    }))
  }

  return (
    <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <article className="info-box info-banner">BATTLESHIP</article>
      <article id="settings-box" className="info-box"><span className="settings-banner">SETTINGS</span>
        <div id="setting-row1" className="setting-row">
          <article className="table-container">
            <table id="settings-table" className="settings-table" style={{ width: '50%' }}>
              <thead>
                <tr className="settings-table-row">
                  <th>Ship</th>
                  <th></th>
                  <th>Length</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {shipList}
              </tbody>
            </table>
           

          </article>

          <article id="settings-list">
            <article className="settings-box-right">
              <div className="">Board Size: </div>
              <span id="setting-bsi" data-testid="board-size" className="settings-number">{gameState.boardSize}</span>
            </article>

            <div className="ticker-box-outer">
              <div id="setting-del-bsi" className="ticker-box" onClick={(handleBoardSizeDecrease)}>
                -
          </div>
              <div id="setting-add-bsi" data-testid="inc-board-size" className="ticker-box" onClick={handleBoardSizeIncrease}>
                +
          </div>
            </div>
            <article className="settings-box-right">
              <div className="">Difficulty: </div>
              <span id="setting-dif" className="settings-number" data-testid="difficulty">{gameState.diffArray[gameState.difficulty]}</span>
            </article>

            <div className="ticker-box-outer">
              <div id="setting-del-dif" className="ticker-box" onClick={(handleDifficultyDecrease)}>
                -
          </div>
              <div id="setting-add-dif" className="ticker-box" data-testid="inc-difficulty" onClick={(handleDifficultyIncrease)}>
                +
          </div>
            </div>
          </article>

        </div>
        <div id="setting-row2" className="setting-row">
          <span className="info-banner info-box settings-button" onClick={playWithFriend}>Play Online With Friend</span>
          <span id="btn-play-cpu" className="info-banner info-box settings-button">Play Computer</span>
        </div>

      </article>
    </div>
  )

}