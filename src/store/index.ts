import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '../components/settingsSlice'

export default configureStore({
  reducer: {
    settings: settingsReducer
  }
})

interface State {
  settings: {
    testVal: Number
  }
}

// export type RootState = ReturnType<typeof reducer>
