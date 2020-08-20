import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '../components/settingsSlice'

export default configureStore({
  reducer: {
    settings: settingsReducer
  }
})


// export type RootState = ReturnType<typeof reducer>
