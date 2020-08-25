import React, { useState, useEffect } from 'react';
import './GameContainer.css'
import Settings from './components/Settings'




function GameContainer() {



  // const [socket, setSocket] = useState({} as SocketIOClient.Socket)



return (
  <div id="game-container" style={{ display: 'flex', flexDirection: 'column' }}>
    This is sample text.
    <Settings />
  </div>)
}

export default GameContainer