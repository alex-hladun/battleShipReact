const { OnlineGame } = require('./OnlineGame')
const {ComputerGame} = require('./ComputerGame')

class Rooms {
  constructor(socket) {
    this.onlineRoomList = {};
    this.computerRoomList = {};
    this.socketDirectory = {}
    this.io = socket;
  }

  newOnlineRoom(gameName, boardSize, hostName) {
    let r = new OnlineGame(gameName, boardSize, hostName);
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

  sendRoomUpdate() {
    this.io.to("lobby").emit("initialRoomList", this.onlineRoomList);
  }
}

module.exports = {
  Rooms
}