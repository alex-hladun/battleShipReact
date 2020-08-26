// Exports a reducer function for the settings logic.
// In charge of deciding if and how to update the state.settings section
// Whenever an action is dispatched.


// SettingsReducer
import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { GameState } from '../store/types'

const genRanNameString = () => {
  return 'user' + (Math.random()*10000).toFixed(0)
}

const initialState: GameState = {
  gameID: '',
  gameLog: ['Welcome to BATTLESHIP! Place your ships. Press \'R\' to rotate.'],
  boardSize: 10,
  gameStatus: 'Place your ships',
  difficulty: 1,
  diffArray: ['EASY', 'MEDIUM', 'HARD', 'IMPOSSIBLE'],
  currentTurn: '',
  player: {
    name: genRanNameString(),
    board: [],
    shipList: [
      {
        name: 'Carrier',
        length: 5,
        horizontal: true,
        hitCount: 0
      },
      {
        name: 'Battleship',
        length: 4,
        horizontal: true,
        hitCount: 0
      },
      {
        name: 'Cruiser',
        length: 3,
        horizontal: true,
        hitCount: 0
      },
      {
        name: 'Submarine',
        length: 3,
        horizontal: true,
        hitCount: 0
      },
      {
        name: 'Destroyer',
        length: 2,
        horizontal: true,
        hitCount: 0
      }
    ]
  },
  opponent: {
    name: 'Opponent',
    board: [],
    shipList: {}
  }
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    incrementBoardSize: state => {
      state.boardSize += 1
    },
    decrementBoardSize: state => {
      state.boardSize -= 1
    },
    incrementDifficulty: state => {
      state.difficulty += 1
    },
    decrementDifficulty: state => {
      state.difficulty -= 1
    },
    changeShipSize: (state, action) => {
      state.player.shipList[action.payload.ship].length += action.payload.delta
    },
    setGameID: (state, action) => {
      state.gameID = action.payload
    },
    resetBoard: (state) => {
      const board = [];
      let row = [];
      for (let i = 0; i < state.boardSize; i++) {
        row.push("O");
      }
      for (let i = 0; i < state.boardSize; i++) {
        const rowD = [...row];
        board.push(rowD);
      }

      state.player.board = board
      state.opponent.board = board
      state.opponent.shipList = state.player.shipList
    }
  }
})

export const { 
  resetBoard,
  incrementBoardSize,
  decrementBoardSize, 
  incrementDifficulty, 
  decrementDifficulty, 
  changeShipSize, 
  setGameID 
} = gameStateSlice.actions

export default gameStateSlice.reducer

export { initialState }

// export const gameCommand = (gameParam: any) => ({ type: 'GAME_COMMAND', gameParam });
