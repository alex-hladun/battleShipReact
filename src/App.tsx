import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GameContainer from './GameContainer'
import { SocketMessage, User } from '../server/createSocketServer'
import socketIOClient, { Socket } from "socket.io-client";
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
// import { setSocket } from './reducers/socketStateSlice'
import { State } from './store/types'
import { connect } from 'react-redux'
import { wsConnect, wsDisconnect } from './modules/websocket'




// const socketClient = socketIOClient();

// const typedUseSlector: TypedUseSelectorHook<State> = useSelector;

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnect())
    console.log('Socket should be connected from App.tsx')
    return () => {
      dispatch(wsDisconnect())
    }
  }, [dispatch])

  return <GameContainer />
}

export default App;
