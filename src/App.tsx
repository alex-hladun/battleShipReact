import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GameContainer from './GameContainer'
import socketIOClient from "socket.io-client";
import { SocketMessage, User } from '../server/createSocketServer'


const socketClient = socketIOClient();

function App() {
  console.log('RE-RENDER')

  const [socket, setSocket] = useState({} as SocketIOClient.Socket)

  useEffect(() => {
    setSocket(socketClient)    
      return () => {
        if (socket.id) {
        socket.disconnect()
        }
      }
    }, [socket])

    useEffect(() => {

      return () => {if (socket.id) {
        socket.close()
      }
      }
    }, [socket])

  useEffect(() => {
    if (socket.connected) {
      console.log('socket connect in useEffect')
      socket.on("chat_message", (data: any) => {
        console.log('initial roomlist from socket', data)
      })
    }
  }, [socket])

  return <GameContainer />
}

export default App;
