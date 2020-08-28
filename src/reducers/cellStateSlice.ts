// SettingsReducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shipLen: 0,
  shipIndex: 0,
  hz: true,
  row: 0,
  col: 0
}

export const cellStateSlice = createSlice({
  name: 'cellState',
  initialState,
  reducers: {
    setActiveCell: (state, action) => {
      state.row = action.payload.row;
      state.col = action.payload.col;
    },
    setActiveShipLength: (state, action) => {
      state.shipLen = action.payload.length;
    },
    changeOrientation: (state) => {
      state.hz = !state.hz;
    },
    increaseShipIndex: (state) => {
      state.shipIndex +=1;

      if (state.shipIndex === 4) {
       
      }
    },
    resetCellState: (state) => {
      state = initialState;
    }
  },
})

export const { 
  setActiveCell, 
  setActiveShipLength, 
  changeOrientation,
  increaseShipIndex,
  resetCellState
 } = cellStateSlice.actions

export default cellStateSlice.reducer

export { initialState }

// export const gameCommand = (gameParam: any) => ({ type: 'GAME_COMMAND', gameParam });
