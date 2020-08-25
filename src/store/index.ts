import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import gameStateReducer from '../reducers/gameStateSlice'
import socketIoMiddleware from '../middleware/socketMiddleware'


export default configureStore({
  reducer: {
    gameState: gameStateReducer
  },
  middleware: [
    ...getDefaultMiddleware(), socketIoMiddleware
  ]
}) 


// export type RootState = ReturnType<typeof reducer>
