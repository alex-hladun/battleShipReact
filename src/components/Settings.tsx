import React from 'react';
import './Settings.css'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { incrementBoardSize, decrementBoardSize } from '../reducers/gameStateSlice'
import { State, Ship } from '../store/types'

// const Player = new Board('Player', 10);


export default function Settings() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
  const dispatch = useDispatch()

  const shipList = gameState.player.shipList.map((ship: Ship, index: number) => {
    return (<tr key={index}>
      <td>{ship.name}</td>
      <td className="ticker-box">-</td>
      <td>{ship.length}</td>
      <td className="ticker-box">+</td>
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
            <div className="ticker-box-outer">
              <div id="setting-del-shp" className="ticker-box">
                -
          </div>
              <div id="setting-add-shp" className="ticker-box">
                +
          </div>
            </div>
          </article>

          <article id="settings-list">
            <article className="settings-box-right">
              <div className="">Board Size: </div>
              <span id="setting-bsi" data-testid="board-size" className="settings-number">{gameState.boardSize}</span>
            </article>

            <div className="ticker-box-outer">
              <div id="setting-del-bsi" className="ticker-box" onClick={() => dispatch(handleBoardSizeDecrease)}>
                -
          </div>
              <div id="setting-add-bsi" data-testid="inc-board-size" className="ticker-box" onClick={handleBoardSizeIncrease}>
                +
          </div>
            </div>
            <article className="settings-box-right">
              <div className="">Difficulty: </div>
              <span id="setting-dif" className="settings-number">{gameState.diffArray[gameState.difficulty]}</span>
            </article>

            <div className="ticker-box-outer">
              <div id="setting-del-dif" className="ticker-box">
                -
          </div>
              <div id="setting-add-dif" className="ticker-box" >
                +
          </div>
            </div>
          </article>

        </div>
        <div id="setting-row2" className="setting-row">
          <span className="info-banner info-box settings-button">Play Online With Friend</span>
          <span id="btn-play-cpu" className="info-banner info-box settings-button">Play Computer</span>
        </div>

      </article>
    </div>
  )

}