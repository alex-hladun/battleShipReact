import React, { useEffect } from 'react';
import './App.css';
import './components/GameContainer/GameContainer.css'
import Settings from './components/Settings/Settings'
import GameContainer from './components/GameContainer/GameContainer'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from './store/types'
import { wsConnect, wsDisconnect } from './modules/websocket'
import Lobby from './components/Lobby/Lobby';
import Disconnect from './components/Disconnect/Disconnect';

function App() {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const viewModeState = typedUseSlector(state => state.viewState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnect())
    return () => {
      dispatch(wsDisconnect())
    }
  }, [dispatch])

  return (
    <>
      {viewModeState.view === 'Lobby' && <Lobby />}
      {viewModeState.view === 'Settings' && <Settings />}
      {viewModeState.view === 'Game' && <GameContainer />}
      {viewModeState.view === 'Disconnect' && <Disconnect />}
    </>
    )
}

export default App;
