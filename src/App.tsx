import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/GameContainer/GameContainer.css'
import Settings from './components/Settings/Settings'
import GameContainer from './components/GameContainer/GameContainer'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from './store/types'
import { wsConnect, wsDisconnect } from './modules/websocket'

function App() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const viewModeState = typedUseSlector(state => state.viewState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnect())
    console.log('Socket should be connected from App.tsx')
    return () => {
      dispatch(wsDisconnect())
    }
  }, [dispatch])

  return (
    <>
      {viewModeState.view === 'Settings' && <Settings />}
      {viewModeState.view === 'Game' && <GameContainer />}
    </>
    )
}

export default App;
