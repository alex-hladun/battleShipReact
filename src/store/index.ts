import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import gameStateReducer from '../reducers/gameStateSlice'
import viewModeReducer from '../reducers/viewModeSlice'
import socketIoMiddleware from '../middleware/socketMiddleware'


export default configureStore({
  reducer: {
    gameState: gameStateReducer,
    viewState: viewModeReducer
  },
  middleware: [
    ...getDefaultMiddleware(), socketIoMiddleware
  ]
}) 


// export type RootState = ReturnType<typeof reducer>
