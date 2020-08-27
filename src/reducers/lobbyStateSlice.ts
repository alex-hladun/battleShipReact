// SettingsReducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  gameList: {}}

export const lobbyStateSlice = createSlice({
  name: 'lobbyState',
  initialState,
  reducers: {
    updateLobby: (state, action) => {
      console.log('updating lobby state', action.payload)
      state.gameList = action.payload
    }
  }
})

export const { updateLobby } = lobbyStateSlice.actions

export default lobbyStateSlice.reducer

export { initialState }

// export const gameCommand = (gameParam: any) => ({ type: 'GAME_COMMAND', gameParam });
