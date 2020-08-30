import React from 'react';
import './Settings.css'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { incrementBoardSize, decrementBoardSize, incrementDifficulty, decrementDifficulty, changeShipSize, resetBoard, checkShipSizes } from '../../reducers/gameStateSlice'
import { startNewGame } from '../../modules/websocket'
import { transitionToGame } from '../../reducers/viewModeSlice'
import { State, Ship } from '../../store/types'

export default function Settings() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
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
      dispatch(checkShipSizes())
    }
  }
  const handleBoardSizeDecrease = () => {
    if (gameState.boardSize <= 5) {
      console.log('Already At Minimum of 5')
    } else {
      dispatch(decrementBoardSize())
      dispatch(checkShipSizes())
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
    if ((gameState.player.shipList[shipID].length + delta) >= 1 &&  (gameState.player.shipList[shipID].length + delta) < gameState.boardSize - 3) {
      dispatch(changeShipSize({
        ship: shipID,
        delta: delta
      }))
     dispatch(checkShipSizes())

    } else {
      console.log('Ship size must be > 1 and < boardSize - 3')
    }
  }

  const playWithFriend = () => {
    new Promise((resolve, reject) => {
      console.log(gameState.player.shipList)
      resolve()
    }).then(() => {
      dispatch(startNewGame({
        type: 'online',
        payload: {
          boardSize: gameState.boardSize,
          username: gameState.player.name,
          shipList: gameState.player.shipList,
          gameName: 'game' + (Math.random()*10000).toFixed(0)
        }
      }))
    }).then(() => {
      dispatch(resetBoard())
      dispatch(transitionToGame())
    })
  }
  
  const playWithComputer = () => {    
    dispatch(startNewGame({
      type: 'computer',
      payload: {
        boardSize: gameState.boardSize,
        username: gameState.player.name,
        shipList: gameState.player.shipList,
        gameName: 'game' + (Math.random()*10000).toFixed(0),
        difficulty: gameState.difficulty
      }
    }))
    dispatch(resetBoard())
    dispatch(transitionToGame())
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
              <div id="setting-del-bsi" data-testid="dec-board-size" className="ticker-box" onClick={(handleBoardSizeDecrease)}>
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
              <div id="setting-del-dif" className="ticker-box" data-testid="dec-difficulty" onClick={(handleDifficultyDecrease)}>
                -
          </div>
              <div id="setting-add-dif" className="ticker-box" data-testid="inc-difficulty" onClick={(handleDifficultyIncrease)}>
                +
          </div>
            </div>
          </article>

        </div>
        <div id="setting-row2" className="setting-row">
          <span className="info-banner info-box settings-button" data-testid="start-online-game" onClick={playWithFriend}>Play Online</span>
          <span id="btn-play-cpu" data-testid="start-cpu-game" className="info-banner info-box settings-button" onClick={playWithComputer}>Play Computer</span>
        </div>
      </article>
    </div>
  )

}