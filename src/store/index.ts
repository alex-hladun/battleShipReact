import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import gameStateReducer from '../reducers/gameStateSlice'
import viewModeReducer from '../reducers/viewModeSlice'
import cellStateReducer from '../reducers/cellStateSlice'
import socketIoMiddleware from '../middleware/socketMiddleware'


export default configureStore({
  reducer: {
    gameState: gameStateReducer,
    viewState: viewModeReducer,
    cellState: cellStateReducer
  },
  middleware: [
    ...getDefaultMiddleware(), socketIoMiddleware
  ]
}) 


// export type RootState = ReturnType<typeof reducer>
