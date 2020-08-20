import React from 'react';
import './Settings.css'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from './settingsSlice'
import { State } from '../store/types'
import Board from '../Board';

const player = {
  shotsPerTurn: 1,
  boardSize: 10,
  difficulty: 2,
  diffArray: [
    'Easy', 
    'Medium'
  ]
}

const Player = new Board('Player', 10);


export default function Settings() {

  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;

  const testVal = typedUseSlector(state => state.settings.testVal)

  const dispatch = useDispatch()

  return (
    <div id="game-container" style={{display:'flex', flexDirection: 'column'}}>
      <article className="info-box info-banner">BATTLESHIP - TestVal should be 20: {testVal}</article>
      <article id="settings-box" className="info-box"><span className="settings-banner">SETTINGS</span>
        <div id="setting-row1" className="setting-row">
          <article className="table-container">
            <table id="settings-table" className="settings-table" style={{width: '50%'}}>
              <tr className="settings-table-row">
                <th>Ship</th>
                <th></th>
                <th>Length</th>
                <th></th>
              </tr>

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
              <div className="">Shots Per Turn: </div>
              <span id="setting-spt" className="settings-number">${player.shotsPerTurn}</span>
            </article>
            <div className="ticker-box-outer">
              <div id="setting-del-spt" className="ticker-box">
                -
          </div>
              <div id="setting-add-spt" className="ticker-box">
                +
          </div>
            </div>
            <article className="settings-box-right">
              <div className="">Board Size: </div>
              <span id="setting-bsi" className="settings-number">${player.boardSize}</span>
            </article>

            <div className="ticker-box-outer">
              <div id="setting-del-bsi" className="ticker-box">
                -
          </div>
              <div id="setting-add-bsi" className="ticker-box">
                +
          </div>
            </div>


            <article className="settings-box-right">
              <div className="">Difficulty: </div>
              <span id="setting-dif" className="settings-number">${player.diffArray[player.difficulty]}</span>
            </article>

            <div className="ticker-box-outer">
              <div id="setting-del-dif" className="ticker-box">
                -
          </div>
              <div id="setting-add-dif" className="ticker-box">
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