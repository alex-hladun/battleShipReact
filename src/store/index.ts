import { configureStore } from '@reduxjs/toolkit'
import gameStateReducer from '../reducers/gameStateSlice'

export default configureStore({
  reducer: {
    gameState: gameStateReducer
  }
})


// export type RootState = ReturnType<typeof reducer>
