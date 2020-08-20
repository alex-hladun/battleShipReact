// Exports a reducer function for the settings logic.
// In charge of deciding if and how to update the state.settings section
// Whenever an action is dispatched.


// SettingsReducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  testVal: 20
}
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    increment: state => {
      state.testVal += 1
    },
    decrement: state => {
      state.testVal -=1
    },
    incrementByAmount: (state, action) => {
      state.testVal += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = settingsSlice.actions

// export const selectCount = state => state.settings.testVal

export default settingsSlice.reducer