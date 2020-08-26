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
      console.log(state.row)
      console.log(state.col)
    },
    setActiveShipLength: (state, action) => {
      state.shipLen = action.payload.length;
    },
    changeOrientation: (state) => {
      state.hz = !state.hz
    }
  }
})

export const { setActiveCell, setActiveShipLength, changeOrientation } = cellStateSlice.actions

export default cellStateSlice.reducer

export { initialState }

// export const gameCommand = (gameParam: any) => ({ type: 'GAME_COMMAND', gameParam });
