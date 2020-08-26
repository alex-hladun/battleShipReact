// SettingsReducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  view: 'Settings',
  gameOver: false}

export const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    transitionToGame: state => {
      state.view = 'Game';

    }
  }
})

export const { transitionToGame } = viewModeSlice.actions

export default viewModeSlice.reducer

export { initialState }

// export const gameCommand = (gameParam: any) => ({ type: 'GAME_COMMAND', gameParam });
