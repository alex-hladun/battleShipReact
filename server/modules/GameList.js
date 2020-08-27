const { OnlineGame } = require('./OnlineGame')
const {ComputerGame} = require('./ComputerGame')

class GameList {
  constructor(socket) {
    this.onlineRoomList = {};
    this.computerRoomList = {};
    this.socketDirectory = {}
    this.io = socket;
  }

  newOnlineRoom(gameName, boardSize, hostName, shipList) {
    let r = new OnlineGame(gameName, boardSize, hostName, shipList);
    this.onlineRoomList[r.name] = r;
    this.socketDirectory[hostName] = [r.name]
    return r;
  }

  newComputerRoom(name, boardSize, host, difficulty) {
    let r = new ComputerGame(name, boardSize, host, difficulty);
    this.computerRoomList[r.name] = r;
    this.socketDirectory[name] = [r.name]
    return r;
  }

  delRoom(name) {
    console.log('org roomList: ', this.roomList)
    delete this.onlineRoomList[name]
    console.log('new roomList: ', this.roomList)
  }

  sendRoomUpdate(io) {
    io.to("lobby").emit("gameListUpdate", this.onlineRoomList);
  }
}

module.exports = {
  GameList
}