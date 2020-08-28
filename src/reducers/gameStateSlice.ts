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
    ghostBoard: [],
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
    name: 'Waiting for Opponent...',
    board: [],
    ghostBoard: [],
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
      state.player.ghostBoard = board
      state.opponent.board = board
      state.opponent.ghostBoard = board
      state.opponent.shipList = state.player.shipList
    },
    placeShip: (state, action) => {
      if (action.payload.hz) {
        for (let i = 0; i < action.payload.shipLen; i++) {
          state.player.board[action.payload.row][action.payload.col + i] = action.payload.shipID
        }
      } else {
        for (let i = 0; i < action.payload.shipLen; i++) {
          state.player.board[action.payload.row + i][action.payload.col] = action.payload.shipID
        }
      }
    },
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload
    },
    setCurrentTurn: (state, action) => {
      if (action.payload === state.player.name) {
        state.currentTurn = true;
        state.gameStatus = 'Your Turn'
      } else {
        state.currentTurn = false;
        state.gameStatus = 'Opponent\'s Turn';
      }
    },
    setNewGameData: (state, action) => {
      console.log('new game data in gameState reducer', action.payload)
      state.gameID = action.payload.gameID;
      state.boardSize = action.payload.boardSize;
      state.player.shipList = action.payload.shipList;
      state.opponent.name = action.payload.opponentName;
      state.opponent.ghostBoard = action.payload.ghostBoard;
      state.currentTurn = action.payload.currentTurn;
    },
    addNewMessage: (state, action) => {
      console.log('new game message in gameState reducer', action.payload)
      state.gameLog.push(action.payload)
    },
    addOpponent: (state, action) => {
      if (action.payload !== state.player.name) {
        state.opponent.name = action.payload
      }
    },
    addShipHit: (state, action) => {
      if (action.payload.user === state.player.name) {
        state.player.shipList[action.payload.shipIndex].hitCount ++;
      } else if (action.payload.user === state.opponent.name) {
        state.opponent.shipList[action.payload.shipIndex].hitCount ++;
      }
    },
    updateBoard: (state, action) => {
      if (action.payload.user === state.player.name) {
        state.player.board[action.payload.row][action.payload.col] = action.payload.result;
      } else if (action.payload.user === state.opponent.name) {
        state.opponent.board[action.payload.row][action.payload.col] = action.payload.result;
      }
    }
  }
})

export const { 
  resetBoard,
  addOpponent,
  incrementBoardSize,
  decrementBoardSize, 
  incrementDifficulty, 
  decrementDifficulty, 
  changeShipSize, 
  setGameID,
  placeShip,
  setGameStatus,
  setCurrentTurn,
  setNewGameData,
  addNewMessage,
  addShipHit,
  updateBoard
} = gameStateSlice.actions

export default gameStateSlice.reducer

export { initialState }

// export const gameCommand = (gameParam: any) => ({ type: 'GAME_COMMAND', gameParam });
