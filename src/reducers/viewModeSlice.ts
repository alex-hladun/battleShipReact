// SettingsReducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  view: 'Lobby',
  gameOver: false}

export const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    transitionToGame: state => {
      state.view = 'Game';

    },
    transitionToSettings: state => {
      state.view = 'Settings'
    },
    transitionToLobby: state => {
      state.view = 'Lobby'
    }
  }
})

export const { 
  transitionToGame,
  transitionToSettings,
  transitionToLobby
 } = viewModeSlice.actions

export default viewModeSlice.reducer

export { initialState }

// export const gameCommand = (gameParam: any) => ({ type: 'GAME_COMMAND', gameParam });
