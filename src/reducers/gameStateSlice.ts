// Exports a reducer function for the settings logic.
// In charge of deciding if and how to update the state.settings section
// Whenever an action is dispatched.


// SettingsReducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  boardSize: 10,
  difficulty: 1,
  diffArray: ['easy', 'medium', 'hard', 'impossible'],
  player: {
    name: '',
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
  }
,
  opponent: {}
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    incrementBoardSize: state => {
      state.boardSize += 1
    },
    decrementBoardSize: state => {
      state.boardSize -=1
    }
  }
})

export const { incrementBoardSize, decrementBoardSize } = gameStateSlice.actions

export default gameStateSlice.reducer

export { initialState }