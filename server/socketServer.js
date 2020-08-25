const socketIO = require('socket.io')

module.exports={
  newSocketServer : function(http) {
    const io = socketIO(http)

    console.log('Starting socket server...')

    io.sockets.on("connection", function (socket) {
      // Send roomList to each new participant
      console.log('Socket connected to server')
      socket.join("lobby");
      socket.emit("set_game_id", 'test')
      // io.emit("set_game_id", 'test')
      console.log('socket emit send')
    
      socket.on('newGame', data => {
        console.log('new game data request', data)
      })
    })

  }
}